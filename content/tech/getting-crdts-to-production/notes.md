# Conflict-free replicated databases (CRDBs)
- Solving relational means we can always downgrade to NoSQL

| Name | Diameter (km) | Weight (10^24kg) | `t_name` | `t_diameter` | `t_weight` | `t_deleted ` |
|-|-|-|-|-|-|-|
| Mercury | 4879 | 0.33 |
| Venus | 12,104 | 4.87 |
| Earth | 12,756 | 5.97 |
<!-- | Mars | 6792 | 0.642 |
| Jupiter | 142,984 | 1898 |
| Saturn | 120,536 | 568 |
| Uranus | 51,118 | 86.8 |
| Neptune | 49,528 | 102 | -->

# Decentralized data migrations

# Designing data structures and invariants

# Authorization and encryption
- https://www.biscuitsec.org/

# Performance and memory
- Least possible amount of data: causal length sets + Lamport timestamps for LWW registers
- In-memory log = compressed format
- Garbage collection

# Master plan
- Implement a CRDB
- Implement advanced data types (arrays, text) as queries over a set
- Add incremental view maintenance (this is the part where I have no idea)
- Add migrations & authorization
- Ship it
- Make it fast and small

# Notes
- CALM theorem and monotonicity: https://twitter.com/geoffreylitt/status/1514293685021814791
- Performant: lowest possible memory footprint, especially in JS (even if code gets ugly)
- Garbage collection:
    - See `crudite` in "Code" section below
    - Braid's Antimatter: https://github.com/braid-org/braidjs/tree/master/antimatter
- Reactive: means you can build your UI / app on top
- Custom language? See CScript
- Incremental: could we have both the data structures, our queries and the UI run as one single incremental computation?
    - automatic incrementalization may make semantics much easier to reason about for users, by allowing them to use sets of operations & just merge them together
- Arbitrary data structures (graphs)
- CRDT database?
    -> [Towards a General Database Management System of Conflict-Free Replicated Relations](https://munin.uit.no/bitstream/handle/10037/22344/thesis.pdf)
- Ability to hook into operation log for sync to a database (e.g. receive creates / updates / deletes / maybe other operations)
- Fast start-up (scalability)
    - Use compressed format as in-memory operation log, to avoid decompression time
- Schema-aware
    - See Cambria
    - Decentralised migrations
    - Backward migrations may not be necessary, _except_ for late updates
    - In this case, delta CRDTs may be especially interesting: a delta is just a piece of state, so a forward migration may be applied to it
- GraphQL compatible?
- Extensible
    - User-defined conflict resolution
    - User-defined operations
    - Move: 
    - Make it easy to create custom CRDTs with domain-specific invariants
    - Framework makes distributed semantics very clear, by detecting concurrent operations
    - Framework takes care of sync
    - [Merge What You Can, Fork What You Can’t: Managing Data Integrity in Local-First Software](https://dl.acm.org/doi/pdf/10.1145/3517209.3524041)
    - [ECROs building global scale systems from sequential code](https://dl.acm.org/doi/10.1145/3485484)
- Security
    - Encryption
    - Byzantine fault tolerance: https://martin.kleppmann.com/papers/bft-crdt-papoc22.pdf
    - Access control: https://hal.inria.fr/hal-03584553/file/papoc.pdf
    - Claim-based authorization (Automerge issue): https://github.com/automerge/automerge/issues/419
- Implementation
    - fuzzing

- Papers
    - Efficient embedding of other CRDTs in Map CRDTs: https://mattweidner.com/assets/pdf/Embeddable_counter_CRDT.pdf
    - Space-time datalog for distributed systems:
        - Dedalus: https://dsf.berkeley.edu/papers/datalog2011-dedalus.pdf
        - Blazes (automatic coordination analysis for Dedalus): https://dsf.berkeley.edu/papers/icde14-blazes.pdf
    

- Code to look at
    - https://github.com/lord/crudite
    - https://github.com/hyoo-ru/crowd.hyoo.ru
    - Automerge sync protocol & hash chaining: https://github.com/automerge/automerge/issues/290
    - https://github.com/orbitdb/orbit-db
    - Replicated Object Notation for data compression
    - Solid optimizations for JS:
        - Check out the `reactivity` channel on Discord
        - Instead of `() => signal() * 2`, do `function memo(arg1) { return arg1() * 2 }; const fn = memo.bind(undefined, signal);` 