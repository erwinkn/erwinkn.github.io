---
title: "An introduction to cement & concrete from the climate lens"
subtitle: "We can't replace it and we can't take the CO2 out of it. How do we deal with it?"
description: "The concrete industry is fundamental for our civilisation, yet will be incredibly hard to decarbonise. Here's what I learned from working on long term roadmaps towards carbon neutral cement."
date: 2021-02-21
math: true
toc: true
image: imgs/montalieu.jpg
imageAlt: Aerial overview of a cement plant in Montalieu, France
---

## Introduction

_Welcome to the first article in a 3-part series about the cement & concrete industries and their place in the climate fight. It provides a general introduction to the subject, with some surprising facts I discovered along the way._
 
_This is a personal perspective and is subject to change based on feedback and further discussions. Feel free to [reach out](mailto:erwin.kuhn@protonmail.com)!_

{{< sidenote-content id=1 >}}For the anecdote, Louis Vicat is the inventor of one of the first modern cement formulations in 1817! He also released his discovery to the world without any patent, which enabled tremendous improvements in construction efficiency at the time.{{< /sidenote-content >}}

I've been working for the past year with {{< sidenote id=1 >}}Vicat,{{< /sidenote >}} a large French cement group, on their climate strategy. More specifically, we are developing N-Zero, a modelling tool to create roadmaps towards carbon neutral cement. Coming from the computer science world, I had to learn everything along the way and I quickly became fascinated. 

Whenever I talk about my work, people often note that "it's great that the industry is making progress on climate questions, but don't forget: *it's still concrete after all*."

In this series, I want to unpack this observation. Especially the assumptions behind it. Why is concrete harmful? How is it harmful? Can "eco-friendly" concrete actually mean something? If so, how will the buildings and the material world around us evolve in response?

I will answer these questions in three parts. The first article sets the decor for the discussion, including a few facts that really surprised me as I was learning about the subject. To be honest, I didn't understand how fundamental concrete is for our civilization before I started working on it.

The second article will focus on the technologies and actions that can lead us to reduce the carbon footprint of concrete. It will start from zero and go in-depth on each subject, leveraging some of my modelling work.

The third article will border on science fiction. I'm interested in imagining the future of the construction industry (with a special emphasis on concrete obviously). What would carbon-neutral buildings be made of, and look like? Will there still be concrete? It won't be exhaustive but I have a handful of ideas I want to explore.

## The difference between cement and concrete
Before we go any further, I  want to answer a question I get asked very often: what is the difference between cement and concrete?

Simply put, concrete is what you pour to build things and cement is the glue that holds everything together. One way to understand it is the cake analogy 🎂: if concrete is a cake, cement is the flour that holds it together.

More precisely, cement is a fine powder that is mixed with sand and crushed rocks (called "aggregates") to form the concrete mix. Once the mix is hydrated, it starts to solidify and, after a short time, sets into a fixed structure.

{{< figure src="imgs/cement-and-concrete.jpg" caption="*Here's some cement on top of a concrete block*" alt="Cement powder on top of a concrete block" width="600px" >}}

## Concrete is everywhere

Concrete is one of those materials that is so fundamental to our lives that we barely pay attention to it. It has been in use since Antiquity and modern civilisation would not have been possible without it. It is [the most widely used man-made substance on the planet](https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry) and **the second most used substance overall, right behind water**.

It's hard to get a sense of how much concrete we actually use.

First of all, it's hard to find accurate numbers for the global annual production of concrete. This is likely due to the very distributed nature of concrete manufacturing, which often happens in small production units, whereas cement is manufactured in large-scale plants, making reporting and accounting easier.

{{< sidenote-content id=2 >}}One gigatonne (Gt) is equal to 1 billion tonnes. It's a commonly used unit to talk about things like global cement production or CO<sub>2</sub> emissions. Every year, humanity puts around 40Gt of CO<sub>2</sub> in the atmosphere.{{< /sidenote-content >}}

Overall, the global production of cement is over {{< sidenote id=2 >}}4 Gt/year.{{< /sidenote >}} Taking 2015 numbers, that's 626 kg of cement per person on the planet - more than the annual food consumption!

Estimations for global concrete production put it at over 10 Gt/year. Cementitious materials, which include a majority of concrete, represent around 30% of global materials use, including fossil fuels. Here's a chart from [Scrivener et al. (2018)](https://doi.org/10.1016/j.cemconres.2018.03.015) that compares their use to that of other common materials:
    
{{< figure src="imgs/scrivener18_materials.jpg" caption="Estimated production of common materials (2002-2005). Cementitions materials also include the cement used in their manufacturing.<br/>From [Scrivener et al. (2018)](https://doi.org/10.1016/j.cemconres.2018.03.015)" alt="Estimated production of common materials (2002-2005)" >}}

As we can see, cementitious materials dwarf the other most common materials, like wood or iron, by far. I'm still surprised every time I see these numbers! Sure, I knew that we use a lot of concrete - but **more than all the other construction materials combined?** It took me a while to interiorise these facts.

This has strong implications on our understanding on concrete and its environmental impact.

## The climate impact of concrete

At the same time, concrete is often seen as dangerous for the environment. For good reason! The cement industry is the largest industrial emitter of greenhouse gas emissions, responsible for [7-8% of global {{<co2>}} emissions](https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry), and the third largest industrial energy consumer, representing 7% of the global industrial energy use.

One perhaps more surprising fact is that concrete actually has a relatively low energy and {{< co2 >}} footprint compared to other construction materials. [The Chatham House report](https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/) on innovation in low-carbon cement and concrete compiled data regarding the embodied energy and {{< co2 >}} emissions of construction materials in the UK, summarized in the figure below.

{{< figure src="imgs/chatham_embodied.png" caption="Embodied emissions and energy for materials used in construction in the UK ([source](https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/1-introduction#paragraph-7220-title))" alt="Embodied emissions and energy for materials used in construction in the UK" >}}


As we can see, **concrete lies on the low end for both embodied energy and embodied {{< co2 >}} per kilogram.** The comparison with wood is especially interesting: somehow it is more energy efficient to mine vast amounts of rock, heat it up over 1400°C and blend it with sand and more rocks than to cut down wood, transport it and process it. I suspect this is is likely due to the high economies of scale that can be achieved in the cement industry --- both on the scale of global concrete production and the scale of individual cement plants, which generally process over a million tonnes of cement per year.

However, to be clear: this is not an entirely fair comparison, for two reasons.

- The data does not factor in carbon sequestration from the wood, which shifts the {{< co2 >}} balance significantly (although concrete also captures {{< co2 >}}, as we will see later)
- Concrete is about 4x denser than wood, although both materials obviously have very different properties and the former generally achieves higher resistances per cubic meter.

Still, even if we were comparing energy and {{< co2 >}} footprints per cubic meter, concrete would come about equal or even below wood. The consequence is that **the very large environmental footprint of the cement industry is not due to concrete being especially destructive in and of itself, but due to the incredibly high amounts of it we use as a civilization.**

{{< figure src="imgs/montalieu.jpg" caption="Vicat's flagship plant of Montalieu, with all the state-of-the-art technological goodness" alt="Aerial overview of Vicat's cement plant in Montalieu, France" >}}

## Can we use less concrete?

Naturally, the first question that comes to mind once we realize the magnitude of concrete's environmental footprint is: can we use less of it?

{{< sidenote-content id=12 >}}Numbers taken from [Our World In Data](https://ourworldindata.org/) in November 2020.{{< /sidenote-content >}}

The short answer to this is: no. Many people around the world still lack access to basic infrastructure such as clean water and electricity, world population is increasing and developing countries will need to build a lot more to continue improving their standards of living. About 1-in-3 people in cities are living in urban slums, with a lack of access to clean water, sanitation, sufficient living space or durable housing. 4.5 billion people, 60% of the world, do not have access to safely managed sanitation and {{< sidenote id=12 >}}2.1 billion people do not have access to safe drinking water.{{< /sidenote >}} The amount of infrastructure development that still needs to happen for the whole world to reach decent living standards is staggering.

As often, it's helpful to look at historical trends to try and get a sense of where we are headed. Here is a graph showing world population, cement production and steel production from 1950 to 2015:

{{< figure src="imgs/scrivener18_cementprod.jpg" caption="World population, cement production and steel production (1950-2015).<br/>From [Scrivener et al. (2018)](https://doi.org/10.1016/j.cemconres.2018.03.015)" >}}

Over the last 65 years, global population has increased ~2.5x, while cement production has increased by over 30x, a much faster rate than other major materials like steel. Over the same time period, the world also saw the fastest increase in living standards in human history. 

To quote the [2016 New Climate Economy report](https://newclimateeconomy.report//2016) from the Global Commission on the Economy and Climate:

> _The world is expected to invest around US$90 trillion in infrastructure over the next 15 years, more than is in place in our entire current stock today._
> -- The Sustainable Infrastructure Imperative

Developing countries are expected to account for 2/3 of this amount. 

Here's an impressive statistic, to get a sense of what that kind of development entails:

{{< figure src="imgs/concrete-in-china-gates.png" caption="Illustration taken from [Gates Notes](https://www.gatesnotes.com/About-Bill-Gates/Concrete-in-China)" alt="China used more cement from 2011 to 2013 than the US in the entire 20th century"  >}}

At the same time, from 1990 to 2014, China saw its share of urban population living in slums decrease from 44% to 25%. 

Given the amount of development still required to meet the UN's Sustainable Development Goals, it seems likely --- and even desirable --- that cement and concrete production will keep on increasing at a rapid rate in the near future.

Coming back to concrete's environmental impact: if we still have a lot to build, can we maybe use less concrete to achieve those goals? Here are the two possibilities.

### 1) Can we replace concrete with other materials, like wood?

{{< sidenote-content id=4 >}}Look at Roman roads and bridges: they relied heavily on concrete, of which they had developed a very advanced understanding. Many of them still hold today and some are still in use!{{< /sidenote-content >}}

Concrete has some unique properties, which make it quite hard to replace. Let's go through some of them.

- **Ease of use and versatility:** concrete is basically rock you can pour, which makes it both usable with nearly zero training and equipment and able to take a wide range of shapes.
- **Durability:** concrete buildings can easily last {{< sidenote id=4 >}}over 100 years{{< /sidenote >}}. If our constructions last longer, we can build less and lower our environmental footprint.
- **Insulation:** higher energy efficiency in our built environment is [incredibly important](https://www.drawdown.org/solutions/insulation) on our path to reduce global {{< co2 >}} emissions. Concrete has a high thermal mass and low air infiltration, both important factors in enhancing the energy efficiency of buildings.
- **Adaptability:** your regular neighborhood concrete plant is able to offer hundreds of different formulations. Every concrete plant has a different set of them, adapted to local environmental conditions. This diversity means concrete can be used anywhere on Earth, from Siberia to the Sahara, and adapted to any construction type.

To my knowledge, no other construction material today can cover all the uses of concrete. Add to that the enormous amounts of it that we use every year and it seems clear that concrete is not going away.

### 2) Can we use concrete more efficiently?
Definitely yes, for many reasons, ranging from improved construction standards and increased recycling to high-tech innovations like 3D printing.

The magnitude of impact of a more efficient use of concrete should not be underestimated. By using different types of concrete in different parts of the same structure, not overdosing cement in concrete mixes and optimising the design of structural elements, gains of [up to 40% less embodied {{< co2 >}}](https://www.research-collection.ethz.ch/handle/20.500.11850/301843) could be achieved.

However, as important as efficiency improvements are, we still need to reach net-zero emissions if we hope to stabilize our climate. To achieve this goal, we need to understand where the {{< co2 >}} emissions are coming from.

## The CO<sub>2</sub> problem {#co2problem}

Concrete is particular in that nearly all of its embodied emissions come from cement production, for which the vast majority of emissions are concentrated at a single point in the manufacturing process: clinker production.

Clinker is the main component of ordinary cement and gives it its binding power. Typically, cement is composed of 70-80% clinker, gypsum, supplementary cementitious materials (SCMs), which also provide binding power, and inert fillers.

Clinker is produced by heating limestone and other mineral materials, like clay, marl or shale, making up the raw meal to temperatures over 1400°C in the massive kilns sitting at the center of cement plants. At this point, the following chemical reaction happens:

$$\ce{CaCO3 -> CaO + CO2}$$

This is the calcination of limestone and the source of most of our problems here. The {{< co2 >}} emissions coming from this chemical reaction are called **process emissions** and make up **2/3rds of the {{< co2 >}} emissions associated with cement production.**

{{< sidenote-content id=5 >}}Over 4000MJ per ton of clinker in fact. That's roughly the energy contained in 100L of crude oil.{{< /sidenote-content >}}

Firing up a cement kiln at 1450°C also requires {{< sidenote id=5 >}}a lot of energy{{< /sidenote >}} and the combustion of fuels makes up **another third of total {{< co2 >}} emissions.**

What this implies is that, **even if we were able to operate cement plants entirely on carbon-neutral fuels, we would still be left with nearly two thirds of the emissions.**

Let's look at a detailed breakdown of the concrete manufacturing process, associated emissions and possible solutions, from the Chatham House report on innovation the cement industry:

{{< figure src="imgs/chatham-co2-breakdown.png" caption="Emissions along the cement supply chain. ([source](https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/1-introduction#paragraph-7218-title))" >}}

Taken altogether, quarrying, transportation, preparation of raw materials, cooling, grinding, mixing and transportation again make up 10% of emissions. Clinker production is the remaining 90%.

However, here's a very interesting consequence of all this: **concrete absorbs {{< co2 >}} from the air.** The chemical reaction we've seen above is actually one side of a triangle.

{{< figure src="imgs/cement-triangle.jpg" caption="The carbon cycle of concrete ([source](https://www.sciencedirect.com/science/article/pii/S0008884618301480))" alt="Diagram showing a triangle of reactions CaCO3 -> CaO -> Ca(OH)2 -> CaCO3" width="80%"  >}}

During clinker production, we take stable {{< rawhtml >}}CaCO<sub>3</sub>{{< /rawhtml >}} in the form of limestone and turn it at high temperatures into very reactive CaO --- also known as quicklime. Once it is incorporated into the concrete formulation and mixed with water, it rapidly turns into calcium hydrates {{< rawhtml >}}Ca(OH)<sub>2</sub>{{< /rawhtml >}} and solidifies.

Over the lifetime of the resulting structure, those calcium hydrates revert back to the more stable form of {{< rawhtml >}}CaCO<sub>3</sub>{{< /rawhtml >}}, absorbing back the {{< co2 >}} process emissions that were emitted during clinker production.

Concrete used in a building for 80 years will [absorb around 20% of the process emissions](https://cembureau.eu/library/reports/2050-carbon-neutrality-roadmap/) associated with the clinker it contains. That's a lot! We will come back to this at the end of the article. It's worth thinking about how this unique property could be used in conjunction with the technologies described below.


## Towards net-zero: the levers of decarbonisation

The actions and technologies that can help reduce concrete's {{< co2 >}} footprint warrant a whole article of their own. However, it's possible to get a quick understanding of the landscape without diving too deep. So let's do just that!

A mental model which I find really helpful is the one given in the [2050 Carbon Neutrality Roadmap](https://cembureau.eu/library/reports/2050-carbon-neutrality-roadmap/) from CEMBUREAU. It illustrates the five stages of the cement & concrete value chain. All of them are pretty straightforward, except "carbonation": it refers to the fact that concrete

In the following, I will annotate each decarbonisation lever with the stage at which it applies.

{{< figure src="imgs/cembureau-5c.png" caption="The five stages of the cement & concrete value chain" alt="The five stages of the cement & concrete value chain: clinker, cement, concrete, construction and carbonation" width="90%" >}}

Across the whole spectrum of actions that are relevant to reducing concrete's {{< co2 >}} footprint, it's possible to group nearly everything into a few categories.

### Energy efficiency <small class="text-darkSanguine">(clinker & cement)</small>
Thermal and electric efficiency gains can be achieved through optimisation of industrial processes and adoption of the best-in-class kiln technologies. Overall, the potential here is minor: the [IEA global scenario](https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry) estimates a 10% gain in thermal efficiency of clinker production by 2050, corresponding to 3% of the total emissions reductions for the cement industry.

### Fuel substitution <small class="text-darkSanguine">(clinker)</small>

Fuel substitution involves switching from fossil fuels to alternative fuels, often composed of waste products. It helps build the local economy and upcycle substances that would have to handled elsewhere otherwise.

However, it's important to distinguish between two types of alternative fuels: biomass and non-organic waste. In our climate perspective, it's only the increased use of biomass that helps reduce emissions. 

This is a very active area of work and **one of the major levers for short term emissions reductions** in the cement industry. Perhaps surprisingly, there are already European cement plants running on [over 80% alternative fuels](https://lowcarboneconomy.cembureau.eu/5-parallel-routes/resource-efficiency/alternative-fuels/). For instance, Vicat aims to achieve zero fossil fuels in Europe by 2025 and worlwide by 2030.

### Clinker substitution <small class="text-darkSanguine">(cement)</small> {#clinkersubst}
Since clinker production is where nearly all the {{< co2 >}} emissions happen, why not use something else? In fact, clinker substitution is another major area of work in the cement industry today. 

{{< sidenote-content id=6 >}}This leads to alterations in the structural properties of the resulting cement and concrete, like slower strength development. In most cases, this can be mitigated, but not all constructions can rely on those formulations.{{< /sidenote-content >}}

The two materials most commonly used for this are fly ash and ground-granulated blast-furnace slag (or GBFS). They are byproducts of the coal and steel industry, respectively. Both can be used up to {{< sidenote id=6 >}}very high percentages (50+%) of the final cement mix.{{< /sidenote >}}

Another promising material is calcined clay, which has the advantages of not coming from {{< co2 >}}-intensive industries and offering a very large geological supply. The process is still in research & development, but [estimations](https://ecra-online.org/research/technology-papers/) are aiming for cements with up to 35-50% of the mix being calcined clay.

{{< sidenote-content id=7 >}}{{< co2 >}} accounting is a tricky business however. Currently fly ash and GBFS are considered to be 0 kg{{< co2 >}}/t, which is simply not true. This leads to inaccurate claims by some manufacturers that their cement contains 80% or 90% less embodied emissions. The exact {{< co2 >}} content of these materials still needs to be determined, but I believe they have a role to play as the cement industry gets ready for more radical changes.{{< /sidenote-content >}}

**Replacing clinker is the second very promising avenue for** {{< sidenote id=7 >}}<span class="font-semibold">strong reductions in the carbon footprint of cement and concrete in the next decade</span>.{{< /sidenote >}} One caveat is that fly ash and GBFS cannot be sustainable solutions in my opinion. As the coal industry winds down and steel production switches to other processes, like electric furnaces, their supply will decrease. Better alternatives will be needed.

### Carbon capture <small class="text-darkSanguine">(clinker)</small>
The idea here is simple as well: if you can't avoid {{< co2 >}} emissions in the process, capture them from the gas coming out of the kiln, before it gets into the atmosphere.

{{< sidenote-content id=8 >}}For comparison, coal plants have around 15% {{< co2 >}} in their flue gases.{{< /sidenote-content >}}

This is the elephant in the room of low carbon cement. **Let's be clear: we won't get to net-zero emissions cement without carbon capture.** Clinker production is also very well suited to it: very large plants concentrating nearly all the emissions, with a {{< sidenote id=8 >}}high {{< co2 >}} percentage (~30%) in the flue gases.{{< /sidenote >}}

**On the other hand, [carbon capture is very expensive](https://www.mdpi.com/1996-1073/12/3/542), both energetically (+100-150%) and financially (+50-100%).** The technologies are still immature and may run into unexpected problems once they are put into production. As such, the point in time at which carbon capture can be deployed widely is very uncertain. For this reason, all the other decarbonisation levers outlined here are just as crucial in a complete roadmap towards carbon neutral concrete.

### Alternative cement formulations <small class="text-darkSanguine">(concrete)</small>

So far, all solutions above have focused on the regular cement process, known as [Portland cement](https://en.wikipedia.org/wiki/Portland_cement). What about alternatives, you may ask?

There are indeed dozens of cement formulations other than Portland cement. There is however no catch-all solution that we could simply swap in. Often, the choice is strongly dependent on the construction type, as other cements have different physical properties, and the locally available materials.

In any case, nearly all alternative formulations I've seen still involve either calcination of limestone or a strong reliance on fly ash or GBFS, which have their own problems (see the paragraphs on [clinker substitution](#clinkersubst)). I will include resources on the subject at [the end of this article](#refs). Overall, [the consensus](https://ecra-online.org/research/technology-papers/) seems to be that we will likely see an expansion in the types of cements available and smarter choices made on a case-by-case basis -- but Portland cement will remain the vast majority of the market.

### Smarter use of concrete <small class="text-darkSanguine">(construction)</small>

I'll admit this is a bit of a catch-all section. At a high-level, the goal is to reduce the % of clinker in concrete, since nearly all embodied emissions come from there. Often those solutions can be win-win and help drive down costs as well, since clinker is one of the major contributors to the cost of concrete.

Concrete use can be optimised at multiple levels:
- **Using less concrete for the same structural elements through smarter design.** With an emphasis on "smarter": trying to minimise concrete use is sometimes counterproductive. If you use 10% less concrete but have to pick a more resistant formulation with 20% more clinker content, you end up with a higher carbon footprint.
- **Not overdosing cement in concrete.** Using more cement than specified in official standards or technical specs in concrete is common practice. In some cases it's necessary because of environmental conditions, sometimes it's "just to be safe" and make everyone's job easier. The consequence is that concrete sometimes end up with a 10-20% higher carbon footprint than necessary.
- **Using different types of cement and concrete,** focusing on reducing total {{< co2 >}} footprint. Possibilities here include changing the construction process to accomodate formulations with less clinker or using different concrete formulations in different parts of a building.

There are also a number of companies building technological innovations, ranging from [optimising concrete mix](https://alcemy.tech/en/) to [curing it](https://www.carboncure.com/) with {{< co2 >}}.

## Beyond net-zero

**Let's imagine that the year is 2050 and we've achieved carbon neutral cement**. We have incredibly efficient cement kilns running on [pure oxygen](https://en.wikipedia.org/wiki/Oxy-fuel_combustion_process), producing high-quality clinker and capturing 90+% of the {{< co2 >}} coming out. Due to better chemical formulations, smarter use of concrete and a necessity for the construction industry to achieve nearly zero embodied emissions, all the innovations outlined above have become the new normal.

But remember, concrete absorbs {{< co2 >}} during its lifetime. This means that our buildings have not only reduced their footprint: they are now actively removing carbon from the atmosphere. Even better, we may have found ways to accelerate the recarbonation process and leverage it to achieve higher resistances with less cement. Upon destruction, the concrete remnants of old buildings are recycled, absorbing even more {{< co2 >}} in the process.

Needless to say, an incredible amount of work needs to be done before we can reach that stage. But I want to keep this in mind: this is what the future could look like. **Over the course of a few decades, the concrete industry could go from the most carbon-intensive industrial sector to being one of the major sinks of {{< co2 >}} in the world.**

Concrete is one of the most crucial sectors in our transition to a carbon-neutral world and is deeply fascinating. Yet, I feel it is often overlooked compared to other areas of interest in discussions around the climate. I highly encourage ambitious folks to come tackle the problem, both within existing organisations, and by building new ones. There's a real shift in the industry right now. The questions it not "will we reach net-zero?" anymore, but "how will we do it?"

## References {#refs}

I have linked many references in this article, but a few reports and papers have been crucial to shape my understanding of the subject. If you're interested in diving deeper, here are my recommandations:

- As an introduction to the subject, [the first chapter of Making Concrete Change](https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/1-introduction) from Chatham House is fantastic. The rest of the report is just as good, I regularly come back to it.
- [The IEA roadmap towards low carbon cement](https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry) is both very clear and a major reference in most reports and academic papers I've seen. You'll need to create an account, but the report is free.
- [This report](https://www.research-collection.ethz.ch/handle/20.500.11850/301843) from the ETH Zürich outlines a very interesting scenario: they try to achieve the highest reductions possible in concrete's carbon footprint, **without carbon capture** (spoiler: they reach a high number). Whereas most other reports focus solely on cement production, they also consider the whole value chain, including concrete and construction.
- For a detailed discussion of cement, concrete & sustainability, the UNEP report ["Eco-efficient cements"](https://wedocs.unep.org/bitstream/handle/20.500.11822/25281/eco_efficient_cements.pdf) covers nearly everything. The 6th chapter on "The Limitations of Earth Chemistry" is short and worth a read, explaining from first principles why our current formulation for hydraulic cements is pretty much the only possible one.
- If you're interested in alternative cement formulations, there are two great papers accompanying the UNEP report above: ["Alternative cement clinkers"](https://www.sciencedirect.com/science/article/abs/pii/S000888461630775X) (Gartner & Sui, 2017) and ["Alkali-activated-materials"](https://www.sciencedirect.com/science/article/abs/pii/S0008884616307700) (Provis, 2018)