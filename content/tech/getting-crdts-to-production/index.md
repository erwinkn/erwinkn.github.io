---
title: 'Getting conflict-free replicated data types to production'
subtitle: 'Missing pieces and the road to ubiquitous offline collaborative apps'
description: 'Conflict-free replicated data types could make offline & collaborative apps easy to build, but current implementations are missing important pieces, like authorisation or data migrations.'
author: 'Erwin Kuhn'
date: 2022-04-23
url: /getting-crdts-to-production/
image: img/cards/crdt.png
imageAlt: "Diagram of a CRDT merging states x,y,z into a single state {x,y,z}"
---

_Hi! This is the introduction to a series of working notes on which pieces I find missing before conflict-free replicated data types (CRDTs) could be considered production-ready for building offline collaborative apps._

_So far, the plan is:_
1. _**Introduction: The road to offline collaborative apps** {{< important >}}(you are here){{< /important >}}_
2. _**Conflict-free replicated databases (CRDBs):** design_
3. _**Conflict-free replicated databases (CRDBs):** implementation_
4. _**Decentralized data migrations**_
5. _**Real-world CRDTs:** Topogether, an app for outdoor climbing and collaborative cartography_
6. _**Extensible CRDTs:** building new data structures and invariants in user-land_
7. _**Secure CRDTs:** access control and Byzantine fault tolerance_
8. _**Optimizing CRDTs:** make it fast, make it small_

_This series will take a while, as I will be building an experimental RDT library to fill the gaps I identified and putting it into production on [Topogether](https://topogether.com/). It's highly likely these notes evolve over time._


Building [local-first](https://www.inkandswitch.com/local-first/) apps, that allow both real-time collaboration and offline work, is still incredibly hard today. Entire companies, like Figma, have been built on the success of their collaborative mode. Until recently, such features were inaccessible without a large team of engineers building a custom synchronisation and conflict resolution engine.

However, in the past decade, [conflict-free replicated data types](https://crdt.tech/) (CRDTs) have emerged as a possible foundation for solving offline collaborative apps. CRDTs are data structures that look like regular objects, arrays, maps or sets, with the additional ability of merging any two replicas that have had different changes applied to them.

The guarantee that they offer is **strong eventual consistency:** two users that have seen the **same set of operations**, but not necessarily in the same order, will necessarily arrive at the **same end state**.

This allows users to retain a local copy of their data on their device, work on it for as long as they wish, syncing their changes with other peers in real time, or at a later date. Central servers are not even needed, but may be added to ensure persistence, propagate messages between peers, or store the data for querying purposes.

For a technical introduction to CRDTs, I recommend [Lars Hupel's series](https://lars.hupel.info/topics/crdt/01-intro/) on their mathematical foundations, or any of the resources on [https://crdt.tech/](https://crdt.tech/)

# Are we CRDT yet?
It's 2022 and we now have implementations of CRDTs that are [expressive](https://github.com/automerge/automerge) (JSON models, text editing), [fast](https://josephg.com/blog/crdts-go-brrr/) and [memory efficient](https://github.com/dmonad/crdt-benchmarks).

In a [real-world scenario](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/#a-real-world-scenario), a library like [Yjs](https://github.com/yjs/yjs) can process a text editing history of 260k operations in 20ms, using 20MB of RAM and with a storage cost of 53% of the original document size.

So, are CRDTs ready for production? Can we start building our apps on them?

Well, yes, there are some cool projects built on CRDTs and a handful of them are running in production. But some critical pieces are still missing in my opinion.

## No schema, no migration
While many CRDT libraries support modeling any JSON object, none of them define a schema. The problem is, any application that persists or communicates data has an implicit or explicit schema. **The day you want to change the expected shape of the data, you're on your own.**

Imagine you are building a writing platform for a newspaper based on a CRDT. In your initial design, each document is either a draft or published. However, the newspaper would like a more structured submission process, where each document has a status of _draft_, _submitted_, _validated_ or _published_. How do you implement a data migration strategy that upgrades not only your database, but also every document that lives on all user devices?

You can see that doing it by hand can get very complicated, very quickly. A much better approach would be to handle it _systematically_, through a **system for evolving the schema of your CDRT**.

The most promising research I've seen in the area of decentralised schema evolution is [Cambria](https://www.inkandswitch.com/cambria/), which provides backward _and_ forward compatibility. The project is built on top of the [Automerge](https://github.com/automerge/automerge) CRDT.

Still, in my opinion, the best place to integrate a data schema is into the CRDT library itself. **Schema awareness gives you superpowers, and not just for migrations.**

For example, GraphQL clients use the schema to [auto-normalise data](https://formidable.com/open-source/urql/docs/graphcache/) and store it in a cache that looks deceptively like a relational database, with a table for each entity.

In the context of CRDTs, schema awareness and auto-normalisation would enable the coordination data migrations, representation of arbitrary graph data structures (not just JSON) & a first-class integration with relational databases.

## No custom data structure
Current CRDT libraries offer types for arrays, maps, sets and registers (= single value container), which, taken together, express the full JSON model.

However, if you want to go beyond that and define a new data type, with application-specific operations and invariants, you'll have to **write your own implementation**, with the full complexity that entails. For example, the [Peritext](https://www.inkandswitch.com/peritext/) project had to roll their own CRDT for rich text editing.

What I want is a framework that supports defining custom CRDTs, custom operations and lets the user define invariants and conflict resolution strategies. The framework should take care of the hard parts of distributed semantics, like [tracking causality](https://en.wikipedia.org/wiki/Version_vector) or synchronising between peers, while leaving the logic to the user.

I'm unsure what form such a tool should take, but work in that area includes:
- [The semidirect product of op-based CRDTs.](https://arxiv.org/abs/2004.04303) That's a mouthful, but it means transforming incoming operations based on concurrent operations already received. For example, you could have an array CRDT with a `map` operation, which also transforms concurrent `insert` operations by applying the `map` function before insertion. Efficient, but tricky to get right.
- [Explicitly Consistent Replicated Objects](https://dl.acm.org/doi/10.1145/3485484) (ECROs), which reorder operations based on user-defined invariants. This is the most general approach, but requires the ability to roll back history at any point & replay operations. It also requires some kind of analysis of which operations may result in a conflict or invariant violation. The authors implement this using a domain-specific language embedded in Scala that statically analyses invariants that are expressed as logic clauses. That's super cool but, _uhm_, may not work for JavaScript and the Web.

Note that both have strong correspondences to [operational transformation](https://en.wikipedia.org/wiki/Operational_transformation), which is the algorithm used by Google Docs (& others), but which usually requires a central server to operate correctly and does not allow long offline.

## BYODB: bring your own database
I just want to be able to persist my RDTs to a database in a form that I can query. Today, that task is anywhere from hard to impossible, depending on the library you're using. If you want a relational database, that becomes plain impossible: you get no information on which entities were created, updated or deleted. 

Ideally, your CRDT library gives you hooks that allow you to easily sync to your own backend. Here, something like the simple replication endpoints of client-side databases like [RxDB](https://rxdb.info/) or [WatermelonDB](https://nozbe.github.io/WatermelonDB/) would be ideal.

Going further, it may be possible to encode the CRDT directly into a relational database using something along the lines of [conflict-free relations](https://munin.uit.no/handle/10037/22344). 

## Security and authorisation
The whole theory around CRDTs usually assumes that peers collaborate with each other: **it is generally assumed that all peers have equal rights and no malicious intent.** This means that anyone that can access a CRDT can emit any valid operation and the CRDT will just fall over if it receives any invalid operation.

This is not how most real-world systems operate. If you're building a decentralised game on a CRDT, you have to expect cheaters. In practice, you want to prevent invalid operations and enforce more fine-grained access control.

### Byzantine fault tolerance
[Byzantine fault tolerance](https://en.wikipedia.org/wiki/Byzantine_fault) (BFT) is the ability of a protocol to handle defective or malicious nodes. This is crucial if we want to allow a large number of peers to access a CRDT, like a wiki, or expect any kind of malicious intent amongst users, like cheaters in a video game.

CRDTs have the very unique property that they can **tolerate an arbitrary number of corrupted nodes** and still maintain strong eventual consistency. Namely, for two nodes A and B, as long as there is a communication channel from A to B that only goes through non-corrupted nodes, the two of them will converge to the same end state.

This property is quite surprising, considering that BFT consensus protocols can only tolerate up to 1/3rd of the nodes being corrupted. The key here is that **CRDTs do not guarantee any kind of global consensus**, only that two participants that have received the same messages always end up in the same state.

For details on how to achieve this property, I'll refer you to Martin Kleppmann's [_Making CRDTs Byzantine Fault Tolerant_](https://martin.kleppmann.com/papers/bft-crdt-papoc22.pdf) (spoiler: it involves variants of [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree)).

### Access control
Once our CRDT construction is robust enough to handle corrupted participants, we need a way to **encode different access control rights for different participants.**

The logical way of distributing this information is to put it directly into the CRDT, as proposed in [_Distributed access control for collaborative applications using CRDTs_](https://hal.inria.fr/hal-03584553/file/papoc.pdf) by Pierre-Antoine Rault, Claudia-Lavinia Ignat and Olivier Perrin (2022).

Roughly speaking, if the CRDT contains authorisation information in the form of `(public_key, rights)` pairs and each message is signed by its author, then we can enforce rights on a per-participant basis.

However, no matter the design, **conflict resolution around authorisation rights will be tricky and application-specific**.

Let's take two concurrent operations:
- `op1` revokes the editing rights of some participant X.
- `op2` is sent by X to perform some edits.

What should the end state be?

In most cases, it seems like safety would dictate that X's operations should be ignored. For instance, they could have seen that their rights were revoked, decided to lie about receiving the message and started broadcasting malicious operations to delete key parts of the document.

In that case, the CRDT needs the ability to **roll back unauthorized operations**, which can be done with reversible operations (not always possible), replaying all operations from the beginning (can be expensive) or using persistent data structures internally (global performance & memory cost).

# The master plan
None of the problems outlined above are fundamentally unsolvable - quite to the contrary! For each issue, there are academic papers providing a solution. All that remains is implementing them in a general-purpose library.

**That's why I'm starting to build an experimental CRDT library.** The goal is to learn from the fantastic work of projects like Automerge and Yjs, while tackling the limitations decribed in this article by changing some of the fundamental design decisions.

**The first building block behind it will be a schema definition.** I'm of the opinion that all apps have a data schema, whether it is defined properly or not, and that integrating it at the CRDT level would provide many benefits.

From there, I have a construction for a _"conflict-free replicated database"_, that can be built on top of any relational database by leveraging the schema definition. Starting from the relational model means it's always possible to downgrade to NoSQL or key-value stores, while the reverse is hard.

Once the basic pieces are in place, I'll be putting it into production on [Topogether](https://topogether.com/), an app for outdoor climbing and collaborative cartography I've been building with friends. The project is based on Postgres and has to handle geographical data, file uploads and access control rights, so it will be a nice playground for the library.

Articles will follow the progress of the implementation, so stay tuned for more!