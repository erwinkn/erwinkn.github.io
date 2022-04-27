---
title: 'Everything is an incremental computation'
subtitle: "Except that Python script in the corner, it doesn't count"
description: "Incremental computation is an algorithm that comes up everywhere, from spreadsheets to compilers to UI frameworks. Why is not seen as universal?"
author: 'Erwin Kuhn'
date: 2022-04-22
url: /incremental/
keywords: ["incremental computation", "reactivity", "change propagation", "universal algorithm"]
image: imgs/cards/incremental-graph.png
imageAlt: "Schema of a computation graph"
---

There are some algorithms in computer science that just keep coming up in unrelated domains. There's one that I see everywhere I look, but never heard described as universal: the algorithm behind **incremental computation, reactivity, or change propagation** - however you want to call it.

Its most famous implementation is the one that powers spreadsheets like Excel. If you have a large sheet with many formulas and the value of one cell changes, how do you propagate that change in the most efficient manner?

The base of the algorithm is always the same. You maintain a computation graph that allows you to answer two questions:
1. **Observers:** for each node (= spreadsheet cell), who depends on it?
2. **Dependencies:** for each node, on whom does it depend?

{{< figure caption="A computation graph" class="w-2/3" >}}
{{< img src="images/incremental-graph.png" alt="Nodes A, B, C = A + B, D = C * B and edges between them" >}}
{{< /figure >}}

With such a visual representation, you can probably see that if B changes, we should first recompute C and then recompute D (and not the other way around). On the other hand, if we change D's formula, we can update its value without recomputing C.

I won't go into more details regarding the algorithm, but if you're interested to learn how performant implementations work, I recommend the excellent 
[_How to recalculate a spreadsheet_](https://lord.io/spreadsheets/).

## Incrementalising all the things

While spreadsheets are the most well known example, this technique is used everywhere:
- Reactive UI frameworks like [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/), [Solid](https://www.solidjs.com/), [Knockout](https://knockoutjs.com/), etc...
- [Build systems](https://www.microsoft.com/en-us/research/publication/build-systems-la-carte/) and [incremental compilation](https://blog.rust-lang.org/2016/09/08/incremental.html)
- [Financial applications](https://opensource.janestreet.com/incremental/)
- [Incremental queries](https://wiki.postgresql.org/wiki/Incremental_View_Maintenance) in databases
- [2D/3D rendering](https://aardvarkians.com/) 

After all, the purpose of all programs is simply to [transform data from one form to another](https://www.youtube.com/watch?v=rX0ItVEVjHc#t=12m38s). All examples above do exactly that, whether they are outputting HTML, compiled programs, financial analytics, SQL query results or graphics.

And at some point, the input data will change. Generally, only a fraction of the input changes, so **how do we update the output without recomputing everything from scratch?** This is exactly the problem of incremental computation.

**Framing the problem this way is also incredibly liberating for designing programs**: for any non-trivial computation, it's _much_ easier to write how to do something from scratch than how to precisely update the output based on any possible change of the input. Being able to automate the update process allows you to just _"write the spec"_ and get an efficient program out of it.

## Compile the update path

Converting a regular computation into an incremental one is essentially a compiler problem. Existing approaches take different forms:
- **Runtime compilers,** which track which values are accessed during a computation ([Solid](https://www.solidjs.com/), the [Rust compiler](https://github.com/salsa-rs/salsa)).
- **"Structured" compilers,** where a library forces you to write your computations in a constrained way to optimise them ([Incremental](https://opensource.janestreet.com/incremental/) or [differential dataflow](https://github.com/TimelyDataflow/differential-dataflow)).
- **Classical compilers,** which can either reuse syntax from their target language ([Svelte](https://svelte.dev/), [Vue](https://vuejs.org/)) or implement a completely new language for incremental computation ([Skip](https://github.com/skiplang/skip), [Fungi](https://github.com/Adapton/fungi-lang.rust)).

## UIs, programming languages and distributed systems

**I think this paradigm is just starting to be embraced and we have barely seen its consequences.**

The modern version of the change propagation algorithm has been formalised in academic research around 2014, with [Adapton](http://adapton.org). That's very new! 

Just in the past few years, we've seen new approaches appear in multiple domains as a result of the wider adoption of efficient incremental computation.

In the web UI world, [Solid](https://www.solidjs.com/) redefined just how efficient JavaScript frameworks can be: it's a 6kB library, nearly as fast as carefully hand-optimised JavaScript code, with [advanced](https://www.solidjs.com/docs/latest/api#usetransition) [features](https://www.solidjs.com/docs/latest/api#rendertostream) that barely exist in other frameworks. In the same vein, [Svelte](https://svelte.dev/) is becoming famous for its simple syntax, where everything "just works" and the compiler takes care of inserting all the incremental update mechanisms, ensuring your UI is always in sync with your data.

In programming languages, **Rust** was the first major compiler to adopt an incremental computation framework for [demand-driven compilation](https://rustc-dev-guide.rust-lang.org/query.html). It also enabled IDE tooling like [rust-analyzer](https://github.com/rust-lang/rust-analyzer) to reuse this approach to improve its performance and analysis, as it attempts to provide instantaneous feedback while you are typing in your editor.

## Incremental view maintenance, from the database to the UI
An area I'm especially interested in is building [offline + collaborative](/getting-crdts-to-production/) applications. It's a hard problem, which can be solved using [conflict-free replicated data types](https://crdt.tech/) (CRDTs): they are data structures that provide automatic synchronisation & conflict resolution, while being robust to extended periods of offline work.

They are also notoriously hard to implement efficiently. In practice, the problem often boils down to: ["how do I efficiently insert this new operation into the existing state?"](https://josephg.com/blog/crdts-go-brrr/). {{< important >}}That sounds suspiciously like an incremental update...{{< /important >}}

One of the clearest ways to define CRDTs is as [a query over a set of operations](https://arxiv.org/abs/1805.04263). This model makes synchronisation trivial, leaving only the need to define conflict resolution semantics. It was also the first to introduce a CRDT operation for moving elements in a tree. Its theoretical simplicity makes it a great foundation for building more complex or domain-specific data types. However, the model provides no way to efficiently update the CRDT query when a new operation comes in. {{< important >}}Wait a second, that's definitely an incremental computation problem!{{< /important >}}

If we were able to define this model in a language or framework that automatically provides incremental updates for queries, then we could **just define the spec for a CRDT and get an efficient implementation for free!**

Combine this with another idea: **a UI is just a function of data.** There is an initial render _(= query over the data)_, then incremental updates as the underlying data changes _(= incremental computation)_.

This is the same setup as replicated data types and both are just a _view_ into the underlying data: the CRDT is a view of a set of operations, the UI is a view of the base application state. 

Going further, maybe the two could be expressed in a single query language, given a suitable query language (not SQL). Then, the [whole application stack could be expressed a single incremental query](https://riffle.systems/essays/prelude/#towards-a-more-radical-approach) over local data, which syncs automatically across the network. In that paradigm, the data is **unified in a single logical place**, simplifying the mental model by eliminating all concerns around stale data or synchronisation.

## Everything is an incremental query

{{< sidenote-content >}}A popular saying is that [all computer science problems are either a compiler or a database](https://twitter.com/PredragGruevski/status/1470206964043071491). Query = database + compiler, incremental updates = compiler, so I guess this fits.{{< /sidenote-content >}}

I suspect nearly all programs could be expressed in this paradigm of {{< sidenote >}}a query & incremental updates.{{< /sidenote >}} What we, as developers, want to write is the _"from scratch"_ computation, the query. Efficient updates should be handled by a compiler, to spare us both the effort and the incredible amount of bugs that comes with handmade implementations.

**More than that, incremental computation is not _just_ a performance gain: the affordances it creates radically change the ways you can think about a problem.**

Once you are freed of the complexity of efficiently maintaining some output, you can start building new architectures you would not have dared to dream about before.
