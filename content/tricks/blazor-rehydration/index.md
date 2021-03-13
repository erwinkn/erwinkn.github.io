---
title: "Transfering state from server to client in a Blazor component"
subtitle: "Or how to solve the \"flash\" problem with Blazor server-side prerendering"
description: "Blazor's server-side prerendering feels amazing, because you get something on the page instantly. Except the first time I used it, the whole page flashed with every refresh."
author: "Erwin Kuhn"
date: "2021-03-10"
---

{{< sidenote-content id=1 >}}I'll give an introduction to Blazor and the whole experience of putting it into production in a separate blog post.{{</ sidenote-content >}}

I wanted to brush up my [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) skills. I had been {{< sidenote id=1 >}}using the new .NET framework{{< /sidenote >}} in my work with [Vicat](https://www.vicat.fr/), an international cement & concrete group based in France, to develop a modelling tool for long term roadmaps towards carbon neutrality. Coding with it was a joy, but I had doubts about its overall performance.

Since there's no better way to put a framework to the test than to build something and optimize the hell out of it, I decided to make a good old Hacker News reader using Blazor WebAssembly. That way, I could compare it with [the myriad of other implementations](https://hnpwa.com/) out there.

You can see the final result of the standalone version, hosted on GitHub Pages, [here](https://erwinkn.com/hnpwa-blazor/).

The last step was to implement server-side prerendering. It enables the server to compute the HTML for the first page and serve it to the client instantly, while the Blazor runtime downloads in the background. I'll skip over the implementation, which is [described in the docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/prerendering-and-integration?view=aspnetcore-5.0&pivots=webassembly#configuration). Overall, it's easy to setup - but it requires a server, so say goodbye to static hosting like GitHub Pages.

The results felt really nice: no more loading indicators, instant content! Except... the whole page rendered then disappeared then rendered again every time you opened the app.

{{< figure src="imgs/blazor-flash.gif" caption="See that loading indicator that appears after the browser gets the page?" alt="Initial HTML render followed by reloading of the page" >}}

Turns out, your component logic will execute twice: once on the server, once in the client. That's [in the docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-5.0#stateful-reconnection-after-prerendering). What's *not* in the docs is that if you have an asynchronous API call in there, Blazor will refresh the page as soon as the call goes off, and render elements as the data arrives. Normally that's great, it makes the page more responsive. In our case that's really bad, because we get this "flash". 

If you dig a bit deeper, the fundamental problem here is that there is no state transfer between the server and the client. In other frameworks, this technique is called [rehydration](https://www.aboutmonica.com/blog/server-side-rendering-react-hydration-best-practices). The documentation linked above provides a way to solve this problem for Blazor Server, but says nothing about pre-rendering for Blazor WebAssembly.

So, here is how you do state rehydration in a Blazor WebAssembly app pre-rendered on a server:

{{< figure src="imgs/serialized-state.jpg" caption="Elegant, right?" alt="Serialized state in code source of the page">}}

Yep, you just serialize everything and dump it onto the page.

Once the client receives the page, it can read the state directly and avoids doing the initial API call.

The idea here is to replace all your API calls with a service that will take care of serializing / deserializing the state. You provide with a function wrapping the API call, so that it can execute it on its own, and a key to store or retrieve the result.

{{< code-block language="csharp" >}}
MyType items = await Cache.GetOrAdd(
    key,
    () => HttpClient.GetFromJsonAsync&lt;MyType>("api/endpoint"));
{{< /code-block >}}

Alright, time to dig into the code of our `Cache` service.

If it's running on the server, the `Cache` service does the API call and stores the result in a dictionary. This dictionary will be used down the line to serialize everything onto the page.

{{< code-block language="csharp" >}}
private Dictionary&lt;string, object> Items { get; set; }
    = new Dictionary&lt;string, object>();

public async Task&lt;TResult> GetOrAdd&lt;TResult>(
    string key, Func&lt;Task<&lt;TResult>> call)
{
    if(IsRunningOnServer)
    {
        var data = await call();
        Items[key] = data;
        return data;
    }
    else
    {
        // Read from page
    }
}
{{< /code-block >}}

But before that, we have to elucidate something: how does the `Cache` service know whether it's running on the server or in the browser? 

A simple way to do that is to check whether or not we have access to a JavaScript runtime.

{{< code-block language="csharp" >}}
private readonly IJSRuntime jsRuntime;
public Cache(IJSRuntime js)
{
    jsRuntime = js;
}
bool IsRunningOnServer =>
    jsRuntime.GetType().Name == "UnsupportedJavaScriptRuntime";
{{< /code-block >}}

Note that the JavaScript runtime we just injected will also be useful when we need to read the state from the page, as Blazor cannot interact with the DOM directly.

Now that the result of all our API calls have been stored in the dictionary, it's time to serialize everything onto the page. For this, we'll use a JavaScript object that will hold our data and provide us a function to retrieve it afterwards.

This JavaScript object is created by a `CacheStore.razor` component in `Server/Components`. The `supress-error` attribute is necessary, otherwise the compiler won't accept a `<script>` tag  in a Razor component. Don't worry, it works fine 😁

{{< code-block language="html">}}
@inject Cache Cache
&lt;script suppress-error="BL9992" type="text/javascript">
    window.Cache = {
        cache: @(new MarkupString(Cache.Write())),
        load: () => window.Cache.cache
    }
&lt;/script>
{{< /code-block >}}

The `Cache.Write` function simply serializes our dictionary:
{{< code-block language="csharp">}}
public string Write() => JsonSerializer.Serialize(Items);
{{< /code-block >}}

Finally, we embed our `CacheStore.razor` in the `_Host.cshtml` page on our server.
{{< code-block language="html" >}}
&lt;component
    type="typeof(HnpwaBlazor.Server.Components.CacheStore)"
    render-mode="Static" />
{{< /code-block >}}

<span class="text-darkSanguine font-semibold">Important!</span> The component should be placed at the very end of `_Host.cshtml`, right before the closing `</body>` tag, to make sure all the components have loaded before it writes the state on the page.

With this, you have everything you need to get that beautiful serialized state that we've seen above. Now, it's time to read from it.

Once again, this happens in our `Cache` service. The first time someone calls the `GetOrAdd` method on the client, the cache loads the `Items` dictionary by calling the JavaScript function defined above.

For all subsequent calls, the `Cache` takes the result from the dictionary and returns it, or does an API call if it cannot find it.

{{< code-block language="csharp" >}}
private bool HasLoaded { get; set; }
public async Task&lt;TResult> GetOrAdd&lt;TResult>(
    string key, Func&lt;Task<&lt;TResult>> call)
{
    if(IsRunningOnServer)
    {
        // We saw this already
    }
    else
    {
        if(!HasLoaded)
        {
            Items = await jsRuntime.InvokeAsync
                        &lt;Dictionary&lt;string, object>>("Cache.load");
            HasLoaded = true;
        }
        it(Items.Remove(key, out var item))
        {
            var json = JsonSerializer.Serialize(item);
            return JsonSerializer.Deserialize<TResult>(json);
        }
        return await call();
    }
}
{{< /code-block >}}

Note that since all our API calls go through the `Cache` service, we remove the items from the dictionary to make sure that the requests are executed normally afterwards.

Alright, we're nearly done here! The last thing we need to do is to register our `Cache` service for both the client and server and inject it into components.

{{< code-block language="csharp" >}}
/* In Server/Startup.cs */
public void ConfigureServices(IServiceCollection services)
{
    services.AddScoped&lt;Cache>();
    // ...
}

/* In Client/Program.cs */
public static async Task Main(string[] args)
{
    // ...
    builder.AddScoped&lt;Cache>();
    // ...
}

/* In some component */
@inject Cache Cache
// markup
@code {
    // ...
    MyType items = await Cache.GetOrAdd(
        key,
        () => HttpClient.GetFromJsonAsync&lt;MyType>("api/endpoint"));
    // ...
}
{{< /code-block >}}

If you want to look at an actual implementation, my Hacker News Blazor reader is running [here](https://hn-blazor.azurewebsites.net/) and the code is available on [GitHub](https://github.com/erwinkn/hnpwa-blazor).

For the things I presented here, you'll mostly want to look into the [`Shared` folder](https://github.com/erwinkn/hnpwa-blazor/tree/main/Shared). There's additional trickery involved with another `ApiService` on top of cache because I have a build process that publishes the app both as standalone and server-hosted. Feel free to ignore that.

Hope this proves useful and feel free to [contact me](mailto:erwin.kuhn@protonmail.com) if anything seems unclear.