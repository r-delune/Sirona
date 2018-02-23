<!--![](http://i.imgur.com/CqXcsZ9.png)-->

### Sirona 

    Sirona helps users record information relating to their wellbeing over the long and short term. The accumulated data is plotted to charts so the user can identify trends or habits that are having a negative impact.

    The current live site is a proof of concept, but I am to expand the idea. Please feel free to fire me an email if you have any useful idea's! 

    Sirona is built using Angular 4, with backend storage and hosting provided by Google Firebase.

***

 ###    GRAPHS
        - Graph displaying total entries of all variables (of either Mood, Sleep, or Diet types)
        - Correlative data expressed on seperate graph

 ###    TIMELINE/ANALYSIS
        - user can scrub through archived data using timeline bar

***

 ###   ACCUMULATING DATA

        Log
            - User enters a value manually for each  

***

### DATA MODEL FOR MOOD ASSESMENT

MOOD

    General mood                 <40 (bad), 50 (normal), >70 (great)
                                      
    Motivation                   <40 (bad), 50 (normal), >70 (great)
                                   
    Concentration                <40 (bad), 50 (normal), >70 (great)

    Energy Level                 <40 (bad), 50 (normal), >70 (great)
                                   
    Concentration                <40 (bad), 50 (normal), >70 (great)

SLEEP

    Sleep Quality                <40 (bad), 50 (normal), >70 (great)

    Sleep Difficulty             <40 (bad), 50 (normal), >70 (great)

    Hours Slept                  1 - 30


DIET/EXERCISE

  Coffee Drank (Cups)               1 - 30

  Alcohol Drank (Units)             1 - 500

  Stamina                           <40 (bad), 50 (normal), >70 (great)

  Appetite                          <40 (bad), 50 (normal), >70 (great)

  kmWalked                          1 - 100km

  KmRan                             1 - 100km
                                    

***

   ###  USER INTERFACE

        LOGIN
        REGISTER
        GRAPH TREE
        ADD ENTRY
            - Mood
            - Diet/exercise
            - Sleep

***

    ### GENERATING AN ASSESMENT

    - Currently Sirona makes little use of correlative data. The next release will have a stronger focus on meaningful relationships between data.

***

    ### LOOKING TO THE FUTURE

        Here are some of the things I intend to include in future releases
            - Ionic mobile version
            - Allow users to create their variables to track
            - Make fully responsive (issues changing size of graph currently)
            - Consolidate forms to appear as popou on main page
            - Include more playful interpretations of the data (i.e flash animation)

        HUAWEI BAND 2 (In future release)
            - May use the Huawei API to retrieve data from users fitbit, or Huawei band 2. Data included heart-rate, steps walked in a day, etc

***

    ### Technology used

            - Angular 4 (with Angular CLI)
            - AngularFire2 datastore
            - Typescript, Javascript, jQuery, JSON
            - Deployed to Firebase Hosting using Firebase CLI