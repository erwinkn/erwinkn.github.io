---
title: "A primer on cement & concrete from the climate lens"
subtitle: "We can't replace it and we can't take the CO2 out of it. How do we deal with it?"
description: "The concrete industry is fundamental for our civilisation, yet will be incredibly hard to decarbonise. Here's what I learned from working on long term roadmaps towards net-zero cement."
date: 2021-02-21
math: true
layout: 'post'
---

_WIP: this article is not yet complete. I am still gathering feedback and information to finalize this guide. If you arrived here, I would be very happy to hear about your thoughts on the article._

_This is the first post in a series about the cement & concrete industries and their place in the climate fight. It provides a general introduction to the subject, with some surprising facts I discovered along the way._
 
_This is a personal perspective and is subject to change based on feedback and further discussions. Feel free to [reach out](/about/)!_

{{< sidenote-content id=1 >}}For the anecdote, Louis Vicat is the inventor of one of the first modern cement formulations in 1817! He also released his discovery to the world without any patent, which enabled tremendous improvements in construction efficiency at the time.{{< /sidenote-content >}}

I've been working for the past few months with {{< sidenote id=1 >}}Vicat,{{< /sidenote >}} a large French cement group, on their climate strategy. Coming from the computer science world, I had to learn everything along the way and I quickly became fascinated. 

Whenever I talk about my work, people are quick to note that "it's great that the industry is making progress on the climate problem, but don't forget: *it's still concrete after all*." I mean, I even get stopped at organic food markets when I go there with a Vicat shopping bag.

I want to unpack this observation and the assumptions behind it. Why is concrete harmful? How is it harmful? Can "eco-friendly" concrete actually mean something? Or is there something inherently problematic with it? Can we solve this problem? If so, how will the buildings and the material world around us evolve in response?

Over time, I also developed a certain vision of the future around these questions. The cement & concrete industry is one of the toughest sectors when it comes to {{<co2>}} emissions reductions. Yet, I think it also holds a great promise for the future, if the (very hard) work is done. Let me unpack what I mean by that.

## The difference between cement and concrete
Before we go any further, I just want to answer one of the questions I get asked the most: what is the difference between cement and concrete?

Simply put, concrete is what you pour to build things and cement is the glue that holds everything together. One way to understand it is the cake analogy 🎂: if concrete is a cake, cement is the flour that holds it together.

More precisely, cement is a fine powder that is mixed with sand and crushed rocks (called "aggregates") to form the concrete mix. Once the mix is hydrated, it starts to solidify and, after a short time, sets into a fixed structure.

{{< figure src="imgs/cement-and-concrete.jpg" caption="*Here's some cement on top of a concrete block*" alt="Cement powder on top of a concrete block" width="600px" >}}

## Concrete is everywhere

Concrete is one of those materials that is so fundamental to our lives that we barely pay attention to it. It has been in use since Antiquity and modern civilisation would not have been possible without it. It is **the most widely used man-made substance on the planet** and the second most used substance overall, right behind water.[^IEA18]

It's hard to get a sense of how much concrete we actually use.

First of all, it's hard to find accurate numbers for the global annual production of concrete. This is likely due to the very distributed nature of concrete manufacturing, which often happens in small production units, whereas cement is manufactured in large-scale plants, making reporting and accounting easier.

{{< sidenote-content id=2 >}}One gigatonne (Gt) is equal to 1 billion tonnes. It's a commonly used unit to talk about things like global cement production or CO<sub>2</sub> emissions. Every year, we put over 40Gt of CO<sub>2</sub> in the atmosphere.{{< /sidenote-content >}}

Overall, the global production of cement is over {{< sidenote id=2 >}}4 Gt/year.{{< /sidenote >}} Taking 2015 numbers, that's 626 kg of cement per person on the planet - more than the annual food consumption! [^Scrivener18]

Estimations for global concrete production put it at over 10 Gt/year.[^Chatham] Cementitious materials, which include a majority of concrete, represent around 30% of global materials use, including fossil fuels. Here's a chart from Scrivener et al.[^Scrivener18] that compares their use to that of other common materials:
    
{{< figure src="imgs/scrivener18_materials.jpg" caption="Estimated production of common materials (2002-2005). Cementitions materials also include the cement used in their manufacturing.<br/>From [Scrivener et al. (2018)](https://doi.org/10.1016/j.cemconres.2018.03.015)" alt="Estimated production of common materials (2002-2005)" width="80%" >}}

As we can see, cementitious materials dwarf the other most common materials, like wood or iron, by far. I'm still surprised every time I see these numbers! Sure, I knew that we use a lot of concrete - but **more than all the other construction materials combined?** It took me a while to interiorise these facts.

This has strong implications on the way we should understand our dependence on concrete and its environmental impact.

## Concrete and climate

At the same time, concrete is often seen as dangerous for the environment. For good reason! The cement industry is the largest industrial emitter of greenhouse gas emissions, responsible for 7-8% of global {{<co2>}} emissions[^IEA18], and the third largest industrial energy consumer, representing 7% of the global industrial energy use.

One perhaps more surprising fact is that concrete actually has a relatively low energy and {{< co2 >}} footprint compared to other construction materials. The Chatham House report[^Chatham] on innovation in low-carbon cement and concrete compiled data regarding the embodied energy and {{< co2 >}} emissions of construction materials in the UK, summarized in the figure below.

{{< figure src="imgs/chatham_embodied.png" caption="Embodied emissions and energy for materials used in construction in the UK ((source)[https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/1-introduction#paragraph-7220-title])" alt="Embodied emissions and energy for materials used in construction in the UK" >}}


As we can see, **concrete lies on the low end for both embodied energy and embodied {{< co2 >}}.** The comparison with wood is especially interesting: somehow it is more energy efficient to mine vast amounts of rock, heat it up over 1400°C and blend it with sand and more rocks than to cut down wood, transport it and process it. I suspect this is is likely due to the high economies of scale that can be achieved in the cement industry --- both on the scale of global concrete production and the scale of individual cement plants, which generally process over a million tonnes of cement per year.

However, to be clear: this is not an entirely fair comparison, for two reasons.

- The data does not factor in carbon sequestration from the wood, which shifts the {{< co2 >}} balance significantly (although concrete also captures {{< co2 >}}, as we will see later)
- Concrete is about 4x denser than wood, although both materials obviously have very different properties and the former generally achieves higher resistances per cubic meter.

Still, even if we were comparing energy and {{< co2 >}} footprints per cubic meter, concrete would come about equal or even below wood. The consequence is that **the very large environmental footprint of the cement industry is not due to concrete being especially destructive in and of itself, but due to the incredibly high amounts of it we use as a civilization.**

{{< figure src="imgs/montalieu_tour.jpg" caption="What a cement plant looks like: rotary kiln and preheater tower at Vicat's state-of-the-art Montalieu plant" alt="Cement kiln and preheater tower" height="800px">}}

## Can we use less concrete?

Naturally, the first question that comes to mind once we realize the magnitude of concrete's environmental footprint is: can we use less of it?

The short answer to this is: no. Many people around the world still lack access to basic infrastructure such as clean water and electricity, world population is increasing and developing countries will need to build a lot more to continue improving their standards of living. About 1-in-3 people in cities are living in urban slums, with a lack of access to clean water, sanitation, sufficient living space or durable housing. 4.5 billion people, 60% of the world, do not have access to safely managed sanitation and 2.1 billion people do not have access to safe drinking water.[^OWD] The amount of infrastructure development that still needs to happen for the whole world to reach decent living standards is staggering.

As often, it's helpful to look at historical trends to try and get a sense of where we are headed. Here is a graph showing world population, cement production and steel production from 1950 to 2015:[^Scrivener18]

{{< figure src="imgs/scrivener18_cementprod.jpg" caption="World population, cement production and steel production (1950-2015).<br/>From [Scrivener et al. (2018)](https://doi.org/10.1016/j.cemconres.2018.03.015)" width="80%" >}}

Over the last 65 years, global population has increased by less than 3x, while cement production has increased by over 30x, a much faster rate than other major materials like steel. Over the same time period, the world also saw the fastest increase in living standards in human history. 

 To quote the [2016 New Climate Economy report](https://newclimateeconomy.report//2016) from the Global Commission on the Economy and Climate:

> _The world is expected to invest around US$90 trillion in infrastructure over the next 15 years, more than is in place in our entire current stock today._
> -- The Sustainable Infrastructure Imperative

Developing countries are expected to account for 2/3 of this amount. 

Here's an impressive statistic, to get a sense of what that kind of development entails:[^Gates]

{{< figure src="imgs/concrete-in-china-gates.png" caption="Illustration taken from [Gates Notes](https://www.gatesnotes.com/About-Bill-Gates/Concrete-in-China)" alt="China used more cement from 2011 to 2013 than the US in the entire 20th century"  >}}

At the same time, from 1990 to 2014, China saw its share of urban population living in slums decrease from 44% to 25%. 

Given the amount of development still required to meet the UN's Sustainable Development Goals, it seems likely --- and even desirable --- that cement and concrete production will keep on increasing at a rapid rate in the near future.

Coming back to concrete's environmental impact: if we still have a lot to build, can we maybe use less concrete to achieve those goals? Here, there are two possibilities.

### 1) Can we replace concrete with other materials, like wood?

{{< sidenote-content id=4 >}}Look at Roman roads and bridges: they relied heavily on concrete, of which they had developed a very advanced understanding. Many of them still hold today and some are still in use!{{< /sidenote-content >}}

Concrete has some unique properties, which make it quite hard to replace. Let's go through some of them.

- **Ease of use and versatility:** concrete is basically rock you can pour, which makes it both very practical and able to take a wide range of shapes and forms.
- **Durability:** concrete buildings can easily last {{< sidenote id=4 >}}over 100 years{{< /sidenote >}}. If our constructions last longer, we can build less and lower our environmental footprint.
- **Insulation:** higher energy efficiency in our built environment is incredibly important on our path to reduce global {{< co2 >}} emissions[^Insulation]. Concrete has a high thermal mass and low air infiltration, both important factors in enhancing the energy efficiency of buildings.
- **Adaptability to extreme environmental conditions: [TODO]** 

To my knowledge, no other construction material today can cover all the uses of concrete. While there definitely are opportunities to use more wood and biomaterials in construction and be smarter with regards to each specific use case, the versatility and sheer scale of use of concrete make it very likely that it remains the main construction material for the near future.

### 2) Can we use concrete more efficiently?
The answer is definitely yes, for many reasons, ranging from improved construction standards and increased recycling to high-tech innovations like 3D printing. For instance, the latter could allow us to manufacture the same structural element with up to 50% less concrete. 

However, as important as efficiency improvements are, we still need to reach net-zero emissions if we hope to stabilize our climate. To achieve this goal, we need to understand where the {{< co2 >}} emissions are coming from.

## The {{< co2 >}} problem {#co2problem}

Concrete is particular in that nearly all of its embodied emissions come from cement production, for which the vast majority of emissions are concentrated at a single point in the manufacturing process: clinker production.

Clinker is the main component of ordinary cement and gives it its binding power. Typically, cement is composed of 70-80% clinker, gypsum, supplementary cementitious materials (SCMs), which also provide binding power, and inert fillers.

Clinker is produced by heating limestone and other mineral materials, like clay, marl or shale, making up the raw meal to temperatures over 1400°C in the massive kilns sitting at the center of cement plants. At this point, the following chemical reaction happens:

$$\ce{CaCO3 -> CaO + CO2}$$

This is the calcination of limestone and the source of most of our problems here. The {{< co2 >}} emissions coming from this chemical reaction are called **process emissions** and make up 50 to 60% of the {{< co2 >}} emissions associated with cement production.

{{< sidenote-content id=5 >}}Over 4000MJ per ton of clinker in fact. That's roughly the energy contained in 100L of crude oil.{{< /sidenote-content >}}

Firing up a cement kiln at 1450°C also requires {{< sidenote id=5 >}}a lot of energy{{< /sidenote >}} and the combustion of fuels makes up another 30 to 40% of total {{< co2 >}} emissions.

What this implies is that, **even if we were able to operate cement plants entirely on carbon-neutral fuels, we would still be left with nearly two thirds of the emissions.**

Let's look at a detailed breakdown of the concrete manufacturing process, associated emissions and possible solutions, from the Chatham House report on innovation the cement industry:[^Chatham]

{{< figure src="imgs/chatham-co2-breakdown.png" caption="Emissions along the cement supply chain. ([source](https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete-0/1-introduction#paragraph-7218-title))" >}}

Taken altogether, quarrying, transportation, preparation of raw materials, cooling, grinding, mixing and transportation again make up 10% of emissions. Clinker production is the remaining 90%.

## Towards net-zero

Across the whole spectrum of technologies and actions that are relevant to reducing concrete's {{< co2 >}} footprint, there are roughly 5 categories:

- **Energy efficiency gains** through optimisation of industrial processes.
- **Fuel substitution,** switching from fossil fuels to alternative fuels.
- **Clinker substitution:** replacing the most {{< co2 >}} intensive component of cement with other materials
- **Carbon capture:** capturing the {{< co2 >}} coming out of the cement plant.
- **Novel cements:** develop formulations less reliant on the calcination of limestone.

Let's go through them and try to estimate the potential of each approach.

### Energy efficiency
As mentioned above, most of the energy is consumed during clinker production. Energy efficiency measures therefore mostly focus on improving cement plant processes. While energy efficiency cannot bring us to net-zero by itself, it can deliver {{< co2 >}} emissions reductions that are also cost-effective or have other benefits. 

{{< sidenote-content id=6 >}}Older kilns often operate using so-called "wet" or "semi-wet" processes, where inputs have higher moisture content and additional thermal energy has to be provided to evaporate all the water.{{< /sidenote-content >}}

Major efficiency improvements can be achieved by upgrading older kilns to a state-of-the-art {{< sidenote id=6 >}}dry process{{< /sidenote >}}: modern dry kilns use up to 50% less energy than the long wet kilns that were used in the 70s.[^Scrivener18]

**Beyond those large upgrades, further improvements are unlikely to be very significant:** best available technology (BAT) today already reaches over 60% efficiency compared to the theoretical minimum energy required for clinker production.[^IEA18] **Best-in-class cement kilns actually are some of the most efficient thermal machines in wide-scale industrial use today.**

Small efficiency gains, such as improved use of waste heat, can be important in enabling other projects to become cost-effective, but their effective impact will only be a few percentage points. In fact, other measures, such as increased use of alternative fuels, will likely lead to increased energy use per ton of clinker overall.

Overall, the IEA roadmap for a low-carbon transition in the cement industry[^IEA18] estimates a decrease of 10% in the global average thermal energy use per ton of clinker by 2050, corresponding to 3% of the total {{< co2 >}} emissions reductions required for the cement industry in a 2°C scenario.

### Alternative fuels
The high temperatures required by cement kilns are both a blessing and a curse when it comes to replacing fossil fuels.

On one hand, they allow the incineration of waste that can't be recycled elsewhere in an efficient manner, since the waste ends up providing the thermal energy required for clinker production. Common examples include old tyres, industrial waste, non-recyclable plastics or paper residues or waste oils. This also plugs cement manufacturers into the local circular economy, which has a lot of additional social and economic benefits for the region.

On the other hand, reaching temperatures over 1400°C requires fuels with a high energy density, which most waste types do not have. Achieving levels of 60% or even 80% alternative fuels then requires additional treatment, such as pre-drying, and degrades the thermal efficiency of the cement kiln.

Perhaps surprisingly, **0% fossil fuels in the cement industry is something that will happen very soon** in some parts of the world: I know that Vicat aims to achieve it by 2025 in France and 2030 in Europe, while other manufacturers are on a similar trajectory. Other regions of the world may take longer ; however, this illustrates that the bottleneck is not a technological one, but an economic one, as enough waste with the appropriate properties needs to be collected and supplied locally.

Overall, fuel substitution is an important area of work in the cement industry today and **one of the main levers, alongside clinker substitution, to deliver {{< co2 >}} emissions reductions in the near future** while more transformative technologies, such as carbon capture, are being developed. 


### Clinker substitution
Clinker is not only the major component of cement, but also what provides it with binding power. The clinker ratio, defined as the % of clinker in the final cement blend, is a strong indicator of mechanical strength and durability of the resulting cement, in the absence of other substitution materials.

Replacing clinker therefore requires finding supplementary cementitious materials (SCMs) that can fulfill the same function of hardening upon hydration. Currently, the main candidates for that role are:

- Fly ash, a by-product of coal plants
- Granulated blast furnace slag (GBFS), a by-product of steel production
- Calcined clays, produced by reacting natural clays at 700-850°C
- Other pozzolanic materials, such as natural volcanic rocks, vegetable ashes or byproducts of silicon production

The first two are the most commonly used clinker alternatives today and are sometimes used up to 50%, or even 70% for GBFS, of the final cement mix. The problem is that they are byproducts of {{< co2 >}} intensive industries and their supply will likely go down in the future, either as the whole industry winds down (in the case of coal) or switches to other processes (in the case of steel).[^IEA18]

Calcined clays seem to be the most promising avenue for sustainable clinker substitution in the long-term. Their geological supply is more than sufficient to cover even a large part of worlwide clinker demand[^Scrivener18] and the cement industry will be able to leverage existing operational knowledge for the calcination process.

{{< figure src="imgs/scrivener18_clinker-substitution.jpg" title="Current use and estimated supply of SCMs and fillers" alt="Current use and estimated supply of SCMs and fillers"  >}}

My mental model for clinker substitution includes two different roles: 
1) **Short term:** an incredibly important lever to deliver strong reductions in the {{< co2 >}} intensity of concrete and cement 
2) **Long term:** a way to mitigate the strong energetic and financial impact of carbon capture, by reducing the amount of expensive clinker required to produce a ton of cement.

However, it is unlikely that we start replacing the majority of clinker with other materials, even by 2050. This is due to a combination of factors, like the uncertain future supply of fly ash and GBFS, the impact on mechanical properties of a high percentage of SCMs and the variations in local conditions, which may make high levels of clinker substitution technically or economically unsustainable. Roadmaps from the IEA[^IEA18] or CEMBUREAU[^CEMBUREAU] estimate a decline of global average clinker ratio from 0.77 to 0.65 by 2050 in their 2°C scenarios.

### Carbon capture
This brings us to the unavoidable elephant on the road to net-zero emissions in the cement industry: carbon capture. 

Let's be clear upfront: if we have to keep on using concrete made from cement that includes a majority of clinker, then **it will be impossible to reach net-zero emissions without capturing the {{< co2 >}} before it reaches the atmosphere.**

{{< sidenote-content id=7 >}}30% vs. 12-15% in a coal plant or 4% in a natural gas plant{{< /sidenote-content >}}

In fact, cement plants are uniquely well-suited for carbon capture: they are large-scale installations with a {{< sidenote id=7 >}}high {{< co2 >}} concentration in the exhaust gases{{< /sidenote >}} and no other way of reducing their process emissions. 

The downside of carbon capture is that it is incredibly expensive, both energetically and financially. Depending on the technology, it would increase thermal or electric demand up to 100% and cost around 50 to 100€ per ton of {{< co2 >}} captured. 

What's more, carbon capture technologies are still immature: estimations of their potential impact on the production process and financial costs are uncertain at best and investments in the billions will be required before they are ready to be brought to market.

Another important question will need to be answered before they can be deployed at scale: what should we do with all the captured {{< co2 >}}?

Geological storage is an option, albeit an expensive one for plants not located near an appropriate site. In any case, heavy subsidies or a very high price on carbon will be required before {{< co2 >}} storage becomes wide-spread in the industry.

Another option is to use it to manufacture some valuable product. The problem here is that the current markets for {{< co2 >}} use are small and won't be able to scale to handle the gigatons of carbon we will need to capture in the future, both in the cement industry and outside.

Nevertheless, exciting projects are happening in the space. To give one of my favorite examples, Vicat aims to develop a pilot cement plant with integrated carbon capture and reuse of waste heat to produce hydrogen through high-temperature electrolysis. The resulting hydrogen could then be used to fuel the kiln, power electric vehicles or even recombined with the captured {{< co2 >}} to produce synthetic fuels able to replace fossil fuels in hard-to-decarbonise industries such as aviation or shipping.

{{< figure src="imgs/valome.png" caption="Plans for a cement plant with integrated carbon capture and high-temperature hydrogen production" >}}


### Novel cements
One might ask: if eliminating emissions from clinker is so hard, why can't we develop other types of cement that don't use clinker?

Such formulations exist and offer varying degrees of emissions reductions potential. I decided not to focus on the topic, as they are subject to various constraints which limit their potential to displace the existing clinker process. If you're interested in the subject, an excellent review can be found in the work of [Scrivener et al. (2018)](https://www.sciencedirect.com/science/article/pii/S0008884618301480).

To summarize common limitations of alternative cements:
- Nearly all have different or inferior physical properties, which often make them only suitable for relatively small niche markets.
- Some of them rely on pozzolanic materials such as fly ash or GBFS, whose supply is already lacking for their use as clinker substitutes.
- Others are dependent on unproven production processes, which could even result in higher process emissions in some cases, unless some breakthrough is achieved.
- Existing construction standards all rely on the mechanical properties of Portland cement. Testing and approving new materials can take over a decade.

For these reasons, Portland cement will very likely constitute the majority of the market for the foreseeable future. In other words, we will have to find a way to decarbonise the existing clinker production, no matter what.

## Beyond net-zero
There is something very important I have not mentioned until now. Concrete actually captures {{< co2 >}} from the air during its lifetime. Quite a significant amount of it actually.

The reason is simple: the chemical reaction introduced in the [{{< co2 >}} problem](#co2problem) is one side of a triangle.

{{< figure src="imgs/scrivener18_calcium-triangle.jpg" caption="The carbon cycle of concrete ([source](https://www.sciencedirect.com/science/article/pii/S0008884618301480))" alt="Diagram showing a triangle of reactions CaCO3 -> CaO -> Ca(OH)2 -> CaCO3" width="80%"  >}}

During clinker production, we take very stable {{< rawhtml >}}CaCO<sub>3</sub>{{< /rawhtml >}} in the form of limestone and turn it at high temperatures into very reactive CaO --- also known as quicklime. Once it is incorporated into the concrete formulation and mixed with water, it rapidly turns into calcium hydrates {{< rawhtml >}}Ca(OH)<sub>2</sub>{{< /rawhtml >}} and solidifies.

However, over the lifetime of the resulting structure, those calcium hydrates revert back to the more stable form of {{< rawhtml >}}CaCO<sub>3</sub>{{< /rawhtml >}}, absorbing back the {{< co2 >}} process emissions that were emitted during clinker production.

Concrete used in a building for 80 years will absorb around 20% of the process emissions associated with the clinker it contains.

This carbon uptake can be [further enhanced](https://fastcarb.fr/en/home/) by retrieving the cement contained in the concrete, grinding it into a fine powder and putting it into a {{< co2 >}}-rich atmosphere, where it will absorb another 20 to 25% of process emissions. Through this process, the old cement mineralizes back into rock, that can then be used as aggregates alongside fresh cement to produce new concrete.

{{< figure src="imgs/concrete-cycle.png" caption="Recycling concrete while enhancing CO2 uptake. (icons by [Freepik](https://www.flaticon.com/authors/freepik))">}}

Here's a though experiment: let's assume we achieve close to zero emissions in cement production (as we will have to anyways). If we now factor in the {{< co2 >}} captured over time, the concrete produced from that cement would not just be carbon-neutral: it would be **carbon-negative**.

{{< sidenote-content id=8 >}}For an excellent introduction to negative emissions, I highly recommend Ryan Orbuch's [primer on the subject](https://www.orbuch.com/carbon-removal/){{< /sidenote-content >}}

We know that we will have to {{< sidenote id=8 >}}take {{< co2 >}} directly out of the atmosphere{{< /sidenote >}} if we are to mitigate the worst effects of climate change. One of the big open questions on the subject of large-scale carbon removal is how to store the captured {{< co2 >}} in a permanent manner, in order to definitely remove it from the atmosphere. 

Concrete captures carbon through mineralization and turns it into very stable {{< rawhtml >}}CaCO<sub>3</sub>{{< /rawhtml >}}. Due to higher concentrations, capturing {{< co2 >}} coming out of cement plants is easier than taking it out of the atmosphere and would still enable important, albeit delayed, carbon sequestration in the produced concrete. This means that in the long-term, **concrete could become one of the major sources of carbon sequestration in the world.** 

How's that for a reversal of situation?

## Summing up

Coming back down to Earth, it is necessary to acknowledge that the cement industry has historically been very conservative and slow to change --- for good reasons, but they are not sufficient anymore. The very nature of the production process makes deep {{< co2 >}} emissions reductions especially challenging to achieve and massive investments will be required.

Concrete is one of the most crucial sectors in our transition to a carbon-neutral world and is deeply fascinating --- yet I feel it is often overlooked compared to other areas of interest in the climate fight. I highly encourage many ambitious folks to tackle the subject, both within existing organisations and by building new ones.

I also have to admit that I have been pleasantly surprised by the ongoing work I have discovered from within the industry. The question is not "will we reach net-zero?" anymore, but "how will we do it?"


## Further reading
Cement & concrete reading list coming soon. Feel free to [contact me](mailto:erwin.kuhn@protonmail.com) in the meantime, I'll do my best to help out as best as I can.


[^IEA18]: https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry
[^IEAweb]: https://www.iea.org/reports/tracking-industry-2020/cement
[^Chatham]: https://www.chathamhouse.org/2018/06/making-concrete-change-innovation-low-carbon-cement-and-concrete
[^Scrivener18]: https://doi.org/10.1016/j.cemconres.2018.03.015
[^Insulation]: https://www.drawdown.org/solutions/insulation
[^OWD]: https://ourworldindata.org/
[^CEMBUREAU]: https://cembureau.eu/library/reports/2050-carbon-neutrality-roadmap/
