---
title: "How should we compare"
subtitle: "A simple calculator for building emissions, that accounts for the value of time "
description: ""
draft: true
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

{{< chart id="stacked-chart1" src="stacked-co2-1.js" class="h-104" >}}

Conceptually, what we care about is the area under the curve, which you can think of as `emissions × time`.

In the chart above, I assumed the same repartition of 72% / 28% between operational and embodied emissions. If we consider more efficient builldings and the fact that our energy sources are going to decarbonise over time (hopefully), the importance of embodied emissions becomes even higher.

{{< sidenote-content >}}Which is still far from standards like [passive houses](https://en.wikipedia.org/wiki/Passive_house) or [net-zero energy buildings](https://en.wikipedia.org/wiki/Zero-energy_building){{< /sidenote-content >}}

For instance, here is the exact same chart for a new building that is {{< sidenote >}}50% more efficient than the average:{{< /sidenote >}}

{{< chart id="stacked-chart2" src="stacked-co2-2.js" class="h-104" >}}

A somewhat more precise way to express this idea is to use what I call a [discount rate](https://en.wikipedia.org/wiki/Present_value). It's a common tool used in economics to express that something happening today is more valuable than something happening in the future. The difference here is that we're going to apply it to {{< co2 >}}. For instance, a discount rate of 7% means that preventing 1 tonne of emissions today is worth as much as preventing 1.07 tonnes of emissions next year.

Choosing the right discount rate, whether in economics or for {{< co2 >}} [is hard](https://grist.org/article/discount-rates-a-boring-thing-you-should-know-about-with-otters/). To keep things simple, here's how I like to think about it: a {{< co2 >}} discount rate of 7% would mean that it's ~7x more important to reduce emissions today than in 2050.

To be able to explore a range of different values for things like discount rate or lifetime, I built a small calculator that compares the relative importance of embodied carbon vs operational emissions, once we take into account the value of time.

<p>
    <span class="block">Energy efficiency</span>
    The new construction uses <span class="energy-use"></span> of the energy of an average building. <span class="efficiency-message"></span>
    Operational emissions are <span class="operational"></span> of lifetime emissions.
</p>
<div class="flex flex-row">
    <div>
        <div class="energy-use"></div>
        <div>energy use</div>
    </div>
    <input id="energy_use_input" type="range" min="0" max="100" value="50">
</div>
<p>
    <span class="block">Discount rate</span>
    A discount rate of <span class="discount"></span> / year means that emissions are <span class="co2mult"></span> as important in 2021 as in 2050
</p>
<div class="flex flex-row">
    <div>
        <div class="discount"></div>
        <div>per year</div>
    </div>
    <input id="discount_input" type="range" min="0.01" max="0.1" value="0.05" step="0.01">
</div>
<p>
    <span class="block">Lifetime</span>
    How long the building lasts. Generally, longer-lived buildings also have higher operational emissions relative to their embodied carbon.
</p>
<div class="flex flex-row">
    <div>
        <div class="lifetime"></div>
        <div>years</div>
    </div>
    <input id="lifetime_input" type="range" min="50" max="150" value="80">
</div>

Embodied emissions are considered to be <span class="embodied-e"></span> of the total CO2e impact
<!-- <div>
    <p>
        <span class="block">Carbon neutrality when?</span>
        When do we reach carbon neutrality? I also assumed 5% of residual emissions from energy use that we can't eliminate.
    </p>
    <div>
        <div>
            In <span class="carbon-neutrality"></span>
        </div>
        <input id="carbon_neutrality_input" type="range" min="2035" max="2070" value="2050" >
    </div>
</div> -->
{{< js src="calculator.js" >}}


# References
- https://www.vox.com/energy-and-environment/2019/3/20/18269356/green-new-deal-building-electrification-states-cities
- https://www.bdonline.co.uk/news/it-doesnt-mention-embodied-carbon-once/5109994.article