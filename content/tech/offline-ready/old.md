# --- Old ---

If you've ever worked on a project that involved a remote database, but also needed to work well without connectivity, you've probably realised that **building offline-ready apps is _hard_.** Here are some of the difficulties I've had the pleasure of running into:
- Setting up caching strategies
- Avoiding data duplication across caches
- Setting up local mutations and [optimistic updates](https://react-query.tanstack.com/guides/optimistic-updates)
- Avoid accepting local mutations that end up being rejected by the server
- Merging server data with local data
- Adapting existing syncing solutions to your own infrastructure (good luck persisting to a relational database)
- Evolving your schema, while ensuring you don't break apps with older data stored locally

And some web specific ones:
- Avoiding or removing [broken service workers](https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/)
- Dealing with [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), its API and its [terrible performance](https://jlongster.com/future-sql-web)
- Handling [server-side rendered](https://www.patterns.dev/posts/server-side-rendering/) pages
- Managing [storage quotas](https://web.dev/storage-for-the-web/#how-much) to avoid your app's data being wiped

**[TODO: link]**
{{< sidenote-content >}}A climbing app that provides guide books ("topos") of outdoor climbing spots and the tools to build them. Since we're focused on outdoor climbing, everything has to work even in the middle of the mountain, with no Internet.{{< /sidenote-content >}}

Working on {{< sidenote >}}[Topogether](https://topogether.com/),{{< /sidenote >}} one of my main early hurdles was the lack of proper framing of what kind of offline capabilities an app may need. Being precise about your requirements in that area is tremendously helpful to estimate upfront the difficulty of reaching your goal and understand which tools may be fit for the job.


Over time, I've developed a mental model of roughly 3 tiers of offline readiness. Each tier builds on the previous one, is much harder to achieve and requires completely different tools. The examples I give focus on the web, but the classification works everywhere.

{{< img src="images/offline_apps_difficulty.png" alt="Difficulty scale: offline reads (easy), offline work (hard), offline + collaborative (nearly impossible)" >}}

# Fallback / restrict features


# Offline reads
If your app only needs to be able to show content to the user while offline, you're in the best case scenario. All you need is:
- a local cache that is persisted somewhere
- a caching strategy (network-first, stale-while-revalidate...)
- a way to feed data from this cache into your UI layer

On the web, a service worker is often all you need (highly recommend [Workbox](https://developer.chrome.com/docs/workbox/)). Data fetching libraries, like [React Query](https://react-query.tanstack.com/) or [GraphQL clients](https://formidable.com/open-source/urql/), often bring their own caching and persistence layer to the table.

For a lot of use cases, there's an interesting gray zone where you mostly serve read-only content, but you may want to allow small updates while offline (like adding an article to "favorites"). Unfortunately, this makes you leave the blissful read-only world and things get much more complicated.

To handle all concerns correctly, you now need to persist operations across sessions, apply them to your cache, send them to the server once you're back online and handle failures or retries. It's still doable by hand, but it's highly error prone. A better solution would be to rely on the [optimistic update](https://react-query.tanstack.com/guides/optimistic-updates) feature provided by many data fetching libraries, which is perfect for that use case. 

# Authentication

# Queuing updates

# Client-side database

# Offline work
If you want your users to be able to work offline in any significant manner, you're now playing in hard mode.

To understand why, let's start with an example: you're building an app for book reviews. A user logs in on a new device and opens their home page, where they see a summary of all their reviews. The data is received from the server and cached on the device.

They go somewhere else, read a new book and come back later. Now, they want to write a new review, so they go the home page and click the "New review" button. They are taken to another page, where they can write and fill in all the additional information. Once they're done, they click "Save" and are sent back to the home screen.

Here's your problem: how do you merge the local new review with the reviews you received from the server?

In essence, what you need is a **local database**, where all the reviews are stored, against which you can query to display the home page. This local database also needs to be able to sync up with the main database on the server. As such, it needs a way to track which items were created, updated and deleted since the last sync.

Ideally, the properties you want out of this local database are the following:
- **queryable**
- **persistent**
- **fast startup** 
- **authorization:** you only want to sync the user's data, not the whole database
- **update squashing:** if your user updates the same entity 300 times in a row, you don't want to send the whole operation log, just the latest version
- **syncable:** needs to keep track of changes since the last sync, push them to the server and pull in new data
- **reactive:** if you update something in the DB, your UI should be updated as well
- **schema-aware:** it's nearly a given that you will have to change the schema of your data at some point, and it's really hard to do without breaking apps that are running with older data, if your tool doesn't support it by default

{{< sidenote-content >}}I have written more about [how we've been tackling some of those while building Topogether](TODO){{< /sidenote-content >}}

{{< sidenote >}}Additional challenges{{< /sidenote >}} in the area of offline work can include:
- authorization: you probably do not want a whole copy of the database on each user's device, just the parts they can access
- file uploads: you may have to do those manually, depending on your solution
- geographical data, which requires special querying capabilities that may be hard to replicate locally (especially if you don't have [spatial indices](https://postgis.net/workshops/postgis-intro/indexing.html))
- complicated queries that you don't want to run locally, but to which you want to add new results based on locally created data (I still haven't found a satisfactory solution for that one)

{{< sidenote-content >}}Closed source solutions were omitted, as I consider those to be too risky as a platform for your app's data.{{< /sidenote-content >}}

Let's go over {{< sidenote >}}some of the solutions{{< /sidenote >}} in this area.

### CouchDB / PouchDB

[CouchDB](https://couchdb.apache.org/) and [PouchDB](https://pouchdb.com/) are the most established contenders in this list. CouchDB is a document store designed for syncing databases. PouchDB is a compatible JavaScript implementation. Both are used by a lot of apps in production, are very stable and operate with a simple document model.

There are, however, major issues with this solution. First, PouchDB assumes that you are using for your whole stack. It's not really possible to customise the syncing process, or use another kind of data store (like a relational database).

{{< sidenote-content >}}Although this [may change in the future](https://github.com/apache/couchdb/issues/1524), there is no release date for per-document access control{{< /sidenote-content >}}

Second, it lacks some of the crucial properties outlined above. No reactivity and no migrations, you'll have to build those yourself. Authorization is basically {{< sidenote >}}creating a database for each user{{< /sidenote >}}, which is cheap in CouchDB, but simply does not work for many scenarios.

Still, if your app can be adapted to work in that model, PouchDB is probably the easiest and safest choice.

### RxDB
[RxDB](https://rxdb.info/) is a client-side NoSQL database, initially built on top of PouchDB, but with [other backends](https://rxdb.info/rx-storage-lokijs.html) as well now.

It adds reactivity, schemas & migrations, multi-tab sync, realtime features and a customisable backend, with built-in CouchDB/PouchDB or GraphQL support. There's a lot to like: it checks all properties on my list, and I think it's the most feature-complete tool for the job today. They even have optimisations to [incrementally update observed queries](https://github.com/pubkey/event-reduce)!

It comes in at 100kB minified + gzipped though, so make sure you have a strong use case before deploying it.

### WatermelonDB
[WatermelonDB](https://github.com/Nozbe/WatermelonDB) is a very promising relational DB option. It was built for React Native, leveraging SQLite and native code for speed, but includes support for the web with IndexedDB as a data store. Overall, it's light (36KB minified + gzipped), fast and feature-complete.

One of the main advantages is that it only loads data on demand from SQLite on mobile, so it launches very quickly, even with GBs of data in the DB.

It doesn't have any built-in backend, but has a [very flexible syncing setup](https://nozbe.github.io/WatermelonDB/Advanced/Sync.html), either by accessing the raw changes, or setting up endpoints according to their spec. For instance, Nozbe, the company that built it, is using it in production with a PostgreSQL main database.

Some caveats though:
- The documentation for advanced patterns is not 100% complete.
- It requires a schema + model definitions for each entity. This gives you a ton of flexibility, but you may end up repeating your main DB schema twice. There's room for automated tools though!
- The web version has to load all data on startup, because IndexedDB is slow and WatermelonDB uses an in-memory backend for speed.

Overall, it's probably the best pick if you're focusing mobile and plan to store large amounts of data.

### urql (and other GraphQL clients)
GraphQL clients have "normalized caches" that are surprisingly close to a database!

Because GraphQL is a typed query language, it's possible to break down the result of any query into individual entities and store them in a normalized form. This is basically equivalent to having a table for each entity type. Add offline mutations + some persistence and you get a client-side database!

My pick in that area would be `urql`, a light client (the core is 7kB!) that is very customisable and has official support for [Graphcache](https://formidable.com/open-source/urql/docs/graphcache/), a normalized caching layer with persistence and offline support.

While I haven't seen complete examples of an app using a GraphQL cache as a real offline database, I think it's a promising avenue. The main advantage I see is that you could derive everything from your GraphQL schema and just write the same queries, that will either fetch from the server or run locally.

The main challenge is that you'll probably have to customise those caches for your specific purpose. By defaut, all data is loaded in memory on startup. Writing optimistic update logic may get quite verbose. Without additional knowledge, your GraphQL client can only perform offline mutations as a queue of optimistic updates, which will be sent in order to the server, instead of just sending the latest value for an entity. All that seems feasible, but this is still unknown territory.

### More resources
I've covered what I consider to be the most promising options with their tradeoffs, but it's always helpful to get more opinions. For this, I highly recommend Jared Forsyth's [_In Search of a Local-First Database_](https://jaredforsyth.com/posts/in-search-of-a-local-first-database/), as well as the [_Opinions_](https://rxdb.info/alternatives.html) section of RxDB's documentation. The author also has a [benchmark for client-side databases](https://github.com/pubkey/client-side-databases) in the browser.

# Offline collaboration: CRDTs
You've decided it's time to step up your game and bring in offline collaboration to your app. Let's say you're building a document editor, like Google Docs or Figma, and you want it to work both in realtime for connected users and offline, so that they can work on the plane and sync up later. 

Here's what you should know: **you'll most likely have to build your own sync engine.** However, I think the field is ripe for motivated individuals and small teams to start building offline + collaborative apps, not just companies with significant engineering power.

The main reason is that distributed systems research from the last decade gave us an extremely powerful tool to solve this problem: [conflict-free replicated data types](https://crdt.tech/), also known as **CRDTs**. In short, they are data structures that look like regular arrays, sets, maps or objects, but that keep track of changes in a way that any two peers working on the same CRDT can sync up any amount of changes and be sure to arrive at the same result.

This synchronisation can happen in realtime, just a few changes at a time, or after extended periods of offline work, where some peer comes back online with a large batch of changes. It also does not require any central server.

I won't be doing a real introduction to CRDTs, but will outline some of the mature implementations and highlight the remaining challenges for building apps on top of them. If you want to learn more, I recommend James Long's talk [_CRDTs for Mortals_](https://www.youtube.com/watch?v=iEFcmfmdh2w) or the [crdt.tech](https://crdt.tech/resources) website.

The two most robust implementations of CRDTs I've seen so far are [Automerge](https://github.com/automerge/automerge) and [Yjs](https://github.com/yjs/yjs). Both support arbitrary JSON documents and collaborative text editing. Automerge is the reference implementation from Martin Klepmann's [research on JSON CRDTs](https://arxiv.org/abs/1608.03960) and offers the most pleasant API in my opinion. Yjs is based on [another CRDT design](https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types) and is both much lighter (24kB vs 46kB) and [much more performant](https://github.com/dmonad/crdt-benchmarks).

Not counting the Rust + WASM rewrites that are happening for both, my pragmatic recommendation would be to go with Yjs, for its built-in IndexedDB, WebRTC and WebSocket backends.

However, you'll soon discover some interesting problems:
- document size only grows with time, as deleted items are not discarded, just marked as deleted (true deletion requires knowing all peers have received the deletion operation)
- only tree-shaped data is allowed, no graphs (this one is a limitation of the libraries, not the theory)
- no move or splice operation (these are [really](https://github.com/automerge/automerge/issues/319) [hard](https://discuss.yjs.dev/t/moving-elements-in-lists/92) [problems](https://lord.io/splicing-crdts/))
- any data structure with more sophisticated invariants (like a balanced tree) cannot maintain those invariants without a custom CRDT implementation
- no schema awareness, meaning decentralised data migrations are basically impossible (see [Cambria](https://www.inkandswitch.com/cambria/))
- all peers have to be trustworthy (Byzantine fault tolerance in CRDTs is [ongoing research](https://martin.kleppmann.com/papers/bft-crdt-papoc22.pdf))

Whether such limitations are deal breakers is up to you and your use case. Collaborative text editing using Yjs works really well for example! Otherwise, you can add to the "CRDT wishlist"**(TODO: link)** I'm writing, before attempting to solve those problems 😉