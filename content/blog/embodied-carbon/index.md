---
title: "Reevaluating the importance of embodied carbon"
subtitle: "A simple calculator for building emissions that accounts for the value of time "
description: ""
date: 2021-04-11
charts: true
url: /embodied-carbon/
# image: img/cards/concrete-intro.jpg
# imageAlt: Aerial overview of a cement plant in Montalieu, France
---

We can separate the {{< co2 >}} emissions associated with a building in two categories:
- **Embodied emissions,** coming from the construction process and the materials used.
- **Operational emissions,** coming from the use of a building by its occupants.

Globally, the split of all building sector emissions is 72% coming from operational and 28% coming from embodied carbon.

{{< chart id="pie-chart" src="charts/pie-chart.js" >}}

{{< sidenote-content >}}I discovered this concept in [The New Carbon Architecture](https://ecobuildnetwork.org/projects/new-carbon-architecture), which I highly recommend. {{< /sidenote-content >}}

For this reason, most of the focus so far has been on attacking operational emissions. However, there's an important dimension that we should also consider: {{< sidenote >}}the time value of carbon.{{< /sidenote >}} Since {{< co2 >}} accumulates in the atmosphere for hundreds of years, any {{< co2 >}} emitted today will have more global warming impact than {{< co2 >}} emitted 30 years from now. Here's another way to say this: it's much more important to prevent emissions today than in 2050.

A consequence is that the embodied carbon of a new building actually matters a lot more than the 28% presented above. One way to see this is to represent the emissions of a new building constructed today, as a function of time.

{{< chart id="stacked-chart" src="charts/emissions-over-time.js" class="h-104" >}}

Conceptually, what we care about is the area under the curve here, which you can think of as `emissions × time`.