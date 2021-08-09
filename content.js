const titles = [
  "Water, Water Everywhere",
  "The Water Cycle",
  "Water Usage in Agriculture",
  "Almost Day Zero City",
  "The Missing Phone",
  "Water and Sanitation",
  "Underground Water",
  "Water Conservation",
  "Water's Beef with Beef",
  "Hidden Water",
];

const questions = [
  ` 
    <div id="qnIndex">1 / 10</div>
    <div id="qnTitle">${titles[0]}</div>
    <div id="qnText">
    <p>____ % of the world's water is freshwater.</p> 
    <p>70 % of this is trapped in the ice caps of Antarctica and Greenland.</p>
    <p>As a result, only ____ % of the world's water is available for human use.</p>
    </div>
    `,
  `
    <p id="qnIndex">2 / 10</p>
    <div id="qnTitle">${titles[1]}</div>
    <div id="qnText">
    <p>_____________ &emsp; is the process of water turning into water vapour by heat from the sun.</p>
    <p>_____________ &emsp; is the process of water vapour mixing with dust particles and various gases to form clouds high in the atmosphere where  is colder.</p>
    <p>_____________ &emsp; is the process of clouds releasing their water content in the form of rain, hail or snow.</p>
    <p>_____________ &emsp; is the process of plants and soil releasing water vapour into the air.</p>
    </div>
    `,
  `
    <p id="qnIndex">3 / 10</p>
    <div id="qnText">
    <div id="qnTitle">${titles[2]}</div>
    <p>Agriculture uses ______ % of the world’s freshwater. </p>
    </div>
    `,
  `
    <p id="qnIndex">4 / 10</p>
    <div id="qnTitle">${titles[3]}</div>
    <div id="qnText">
    <p>Which major city almost ran out of water in 2018?</p>
    </div>
    `,
  `
    <p id="qnIndex">5 / 10</p>
    <div id="qnTitle">${titles[4]}</div>
    <div id="qnText" class="row">
        <div class="col-md-8">
            <img class="constrain-image" src='./media/man-drops-iphone.jpeg' />
        </div>
        <div class="col-md-4 pad-top">
            <p>A news article claimed that a Taiwanese man visited Taiwan's famous Sun Moon Lake in March 2020 and dropped his iPhone into the lake while paddle-boarding.</p> 
            <p>A year later in 2021, he managed to get it back in full working condition, no less. So what's the deal here?</p>
        </div>
    </div>
    `,
  `
    <p id="qnIndex">6 / 10</p>
    <div id="qnTitle">${titles[5]}</div>
    <div id="qnText">
    <p>According to the World Health Organization, ______ % of all diseases in the developing world are water related. </p>
    <p>By 2025, the United Nation estimates that ______ % of the world’s population residing in 50 countries will face water shortage.</p>
    </div>
    `,
  `
    <p id="qnIndex">7 / 10</p>
    <div id="qnTitle">${titles[6]}</div>
    <div id="qnText">
    <p>Of earth’s 37 major underground reservoirs, ______ are on track to be irreversibly emptied.</p>
    </div>
    `,
  `
    <p id="qnIndex">8 / 10</p>
    <div id="qnTitle">${titles[7]}</div>
    <div id="qnText">
    <p>Regarding ways to conserve water, which statement is false?</p>
    </div>
    `,
  `
    <p id="qnIndex">9 / 10</p>
    <div id="qnTitle">${titles[8]}</div>
    <div id="qnText">
    <p>1 kg of wheat requires 1 litre of water to produce. In comparison, 400g of beef requires ______ litres of water to produce.</p>
    </div>
    `,
  `
    <p id="qnIndex">10 / 10</p>
    <div id="qnTitle">${titles[9]}</div>
    <div id="qnText">
    <p>We  consume about ______ litres of water a day in hidden uses, such as the products we use and clothes we wear, but most especially in the food we eat.</p>
    </div>
    `,
];

const options = [
  {
    //Q1
    A: "&emsp; 30 &emsp; 80",
    B: "&emsp; 20 &emsp; 50",
    C: "&emsp; 10 &emsp; 10",
    D: "&emsp; 3.5 &emsp; 1",
  },
  {
    //Q2
    A: "&emsp;Transpiration, &emsp;Precipitation, &emsp;Condensation, &emsp;Evaporation",
    B: "&emsp;Evaporation, &emsp;Condensation, &emsp;Precipitation, &emsp;Transpiration",
    C: "&emsp;Condensation, &emsp;Transpiration, &emsp;Evaporation, &emsp;Precipitation",
    D: "&emsp;Evaporation, &emsp;Precipitation, &emsp;Condensation, &emsp;Transpiration",
  },
  {
    //Q3
    A: "&emsp;10 - 30",
    B: "&emsp;30 - 50",
    C: "&emsp;50 - 70",
    D: "&emsp;70 - 90",
  },
  {
    //Q4
    A: "&emsp;Cape Town, Africa",
    B: "&emsp;Manila, Philippines",
    C: "&emsp;Taipei, Taiwan",
    D: "&emsp;Bangkok, Thailand",
  },
  {
    //Q5
    A: "&emsp;This is fake news",
    B: "&emsp;He hired a scuba diver to retrieve it for him",
    C: "&emsp;The lake dried up and someone found it back for him",
    D: "&emsp;A fisherman fished it out of the lake by luck",
  },
  {
    //Q6
    A: "&emsp;10 &emsp;2",
    B: "&emsp;30 &emsp;5",
    C: "&emsp;50 &emsp;10",
    D: "&emsp;80 &emsp;30",
  },
  {
    //Q7
    A: "&emsp;2",
    B: "&emsp;8",
    C: "&emsp;14",
    D: "&emsp;21",
  },
  {
    //Q8
    A: "&emsp;Farmers adopting efficient irrigation methods in agriculture",
    B: "&emsp;Eating more meat and less fruit and vegetables",
    C: "&emsp;Industries reusing and recycling water",
    D: "&emsp;Reducing food waste since food takes a lot of water to produce",
  },
  {
    //Q9
    A: "&emsp;500",
    B: "&emsp;1000",
    C: "&emsp;2000",
    D: "&emsp;5000",
  },
  {
    //Q10
    A: "&emsp;100",
    B: "&emsp;500",
    C: "&emsp;1000",
    D: "&emsp;3000",
  },
];

const answers = ["D", "B", "D", "A", "C", "D", "D", "B", "D", "D"];

const explanations = [
  //Q1
  `
    <div class="row pad-top">
        <iframe src="https://www.youtube.com/embed/oaQCiwzjnCM" width="100%" class="min-video-height" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="row pad-top">
        <p> Fresh water is a renewable resource, yet the world's supply of clean, fresh water is under increasing demand for human activities. The world has an estimated 1.34 billion cubic kilometers of water, but 96.5% of  is salty. Almost 70% of freshwater can be found in the ice caps of Antarctica and Greenland.</p>
        <p> Less than 1% of this water on Earth is accessible to humans, the rest is contained in soil moisture or deep underground. Accessible freshwater is located in lakes, rivers, reservoirs and shallow underground sources. Rainwater and snowfall do very little to replenish many underground source. <a href="https://en.wikipedia.org/wiki/Peak_water">[Source]</a></p>
        <p> Watch the first three minutes of the following video for a similar explanation. </p>
    </div>
    `,
  //Q2
  `
    <div class="row pad-top">
        <p> An illustrated image of the water cycle. <a href="https://gpm.nasa.gov/resources/images/diagram-water-cycle">[Source]</a></p>
        <img class="constrain-image" src='./media/water-cycle.png' />
    </div> 
    <div class="row pad-top">
        <p> Watch the following video for a similar explanation, from the beginning to the 02:34 minute mark. </p>
        <iframe width="100%" class="min-video-height" src="https://www.youtube.com/embed/ncORPosDrjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `,
  //Q3
  `
    <div class="row pad-top">
        <img class="constrain-image" src='./media/where-the-water-goes-most.png' />
    </div>
    <div class="row pad-top">
        <p>Yup, agriculture is the biggest culprit when it comes to global water use.</p>
        <p>That's why it is so important to find efficient means and ways of conserving water in agriculture, such as ensuring pipes do not leak, recycling greywater, using a closed-loop irrigation system etc.</p>
    </div>
    `,
  //Q4
  `
    <div class="row pad-top">
        <img class="constrain-image" src='./media/cape-town.jpeg' />
        <p class="horz-centre-text"> <br/>For Cape Town, Day Zero hasn’t disappeared, it’s merely been delayed. The catastrophic shortage that nearly turned off its faucets was narrowly averted in 2018 with strict water rationing measures.</p>
    </div>
    <div class="row pad-top">
        <img class="constrain-image"  src='./media/global-water-use.png' />
        <p class="horz-centre-text"> <br/>Note the 7-fold increase in over just one century. </p>
    </div>
    <div class="row pad-top">
        <img src='./media/water-stressed-countries.png' />
        <p class="horz-centre-text"> <br/>A map of predicted water-stressed countries in 2040 </p>
    </div> 
    `,
  //Q5
  `
    <div class="row pad-top">
        <img class="constrain-image" src='./media/sun-moon-lake-dry.jpeg' />
    </div>
    <div class="row pad-top">
        <p> It's not fake news! Thanks to the waterproof case and the fact that the entire lake lost almost all its water due to drought in most of 2020. The man was lucky that the person who picked it up while walking across the dried bed of the lake turned it on and managed to trace the owner. See the 'before' and 'after' image of the drought-stricken lake below. </p>
        <p>Experts believe that Taiwan's water problems have been slowly building as a result of poor handling of its water resources. Despite the island experiencing 2.6 times the amount of the world's average annual rainfall, inadequate planning and an ignorance of water recycling have led to the current crisis.</p>
        <p>One water expert named Lee Hong-yuan explained that Taiwan's agriculture industry utilizes about 70 percent of the country's water supply, but outdated irrigation channels have caused plenty of waste, with almost half of the water being transported being lost to leaks, and a quarter being lost to evaporation during transportation. <a href="https://sea.mashable.com/tech/15242/man-drops-iphone-in-lake-gets-it-back-one-year-later-in-full-working-condition"[Source]</a></p>
    </div>
    `,
  //Q6
  `
    <p class="pad-top">These statistics show the importance of access to clean freshwater for sanitation and disease prevention, and the rising trend of water stress in the world.</p>
    `,
  //Q7
  `
    <div class="row pad-top">
        <iframe width="100%" class="min-video-height" src="https://www.youtube.com/embed/OCzYdNSJF-k?start=122" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="row pad-top">
        <p>This illustrates the concept of peak non-renewable water, where groundwater aquifers are being overpumped (or contaminated) faster than nature recharges them (this example is most like the peak oil debate).</p>
        <p>Ultimately, peak water is not about running out of freshwater, but about reaching physical, economic, and environmental limits on meeting human demands for water and the subsequent decline of water availability and use. <a href="https://en.wikipedia.org/wiki/Peak_water">[Source]</a></p>
        <p>Watch the following video from 02:02 to the 04:43 minute mark to learn about whether we are running out of clean water.</p>
        <p>TLDR: the total amount of water in the world is constant due to the water cycle but whether the water is available for human use is another matter entirely.</p>
    </div>
    `,
  //Q8
  `
    <p class="pad-top">This is a give-away question. Answer is self-explanatory. Eat less meat and more fruit and vegetables to conserve water!</p>
    `,
  //Q9
  `
    <div class="col-md-6">
      <p>Why does beef take so much water to produce? Answer: To simplify, let’s look at Beef. Did you know that the juicy steak you love to eat uses up 15,400 liters of water for every 1 kilo? How? </p>
      <p>Well, the cow needs to eat 1,300 kilograms of grains for 3 years before  can be slaughtered and produce 200 kilos of beef. Those grains require water to grow, the farm and slaughterhouse needs to be cleaned,  </p>
    </div>
    <div class="col-md-6">
      <p>the cow needs to drink – all of these adds up to 3,091,000 liters of water!</p>
      <p>All of that water just to make an innocent looking but delicious steak.</p>
      <p>In comparison, 1kg of chocolate requires 24,000 litres of water. 1 kg of paper only requires 10 litres of water. <a href="https://www.theworldcounts.com/stories/average-daily-water-usage">[Source]</a></p>
    </div>
    `,
  //Q10
  `
    <div class="row pad-top">
        <p>Some examples of the 'hidden' water we all use daily. <a href="https://www.theworldcounts.com/stories/average-daily-water-usage">[Source]</a></p>
    </div>
    <div class="row g-2">
        <div class="col-xl-6">    
            <img class="constrain-image constrain-image-small" src='./media/cocacola-25l.png' />
        </div>
        <div class="col-xl-6">
            <img class="constrain-image constrain-image-small" src='./media/tshirt-2500l.png' />
        </div>
    </div>
    <div class="row g-2">
        <div class="col-xl-6">
            <img class="constrain-image constrain-image-small" src='./media/hamburger-15000l.png' />
        </div>
        <div class="col-xl-6">
            <img class="constrain-image constrain-image-small" src='./media/coffee-130l.png' />
        </div>
    </div>
    `,
];
