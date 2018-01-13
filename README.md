<!--![](http://i.imgur.com/CqXcsZ9.png)-->

### SATORI 

- Gauges mood trends over time using info from fitBit, mood ledger
- Object data will provide a scientically backed diagnosis on mood disorder or depressive disorder
- User information is meant to be entered before sleep
- Data will be accumulated and functions will be available to extrapolate meaningfull information for the user. When patterns in mood changed are identified ideally
  the user might be able to identify stressors/periods of time where they are at their worst and find ways to treat themselves more easily.


- Data can be entered via UI
- Data is plotted on a graph (phase one)
- Data will later be represented by images, where the change in variables will be shown by images (phase two)
- Mood ledger variables will be decided upon using diagnostics from the diagnostic and statistical manual of mental disorders
- More information will be used by the fitbit
- Using the collected data a diagnosis can be made and strenghtened over time as the dataset grows


***

 ###    GRAPHS
        - There will be a graph for each variable
        - There will be a cumative mood graph

 ###    MENTAL LANDSCAPE MODE
        - Trends can be represented in different ways, for example image height and general mood
        - Landscape mode generates an image that represents a mood during a certain period using visual elements (such as figures, objects) whose state changes
          based on the data
        - The primary idea is to generate a landscape with said visual elements
          

 ###    TIMELINE
        - user can scrub through data using timeline bar
        - graph/mental landscape will show accordingly


***

 ###   ACCUMULATING DATA

        MOOD LEDGER

            - DSM Diagnostic Criteria for Major Depressive Disorder and Depressive Episodes
                DSM-IV Criteria for Major Depressive Disorder (MDD)
                    • Depressed mood or a loss of interest or pleasure in daily activities for more than two weeks.
                    • Mood represents a change from the person's baseline.
                    • Impaired function: social, occupational, educational.
                    • Specific symptoms, at least 5 of these 9, present nearly every day:
                        1. Depressed mood or irritable most of the day, nearly every day, as indicated by either subjective report
                            (e.g., feels sad or empty) or observation made by others (e.g., appears tearful).
                        2. Decreased interest or pleasure in most activities, most of each day
                        3. Significant weight change (5%) or change in appetite
                        4. Change in sleep: Insomnia or hypersomnia
                        5. Change in activity: Psychomotor agitation or retardation
                        6. Fatigue or loss of energy
                        7. Guilt/worthlessness: Feelings of worthlessness or excessive or inappropriate guilt
                        8. Concentration: diminished ability to think or concentrate, or more indecisiveness
                        9. Suicidality: Thoughts of death or suicide, or has suicide plan

            - External Stressors or circumstance
            - Alcohol, etc          

        HUAWEI BAND 2
            - 

***

### DATA MODEL FOR MOOD ASSESMENT

    1. General mood                                 0 (Extremely bad), <40 (Depressed), 40-50 (meloncholic), 100 (Happy)
        - morning, afternoon, night
    
    2. Change in Apettite                           0 (not hungry), 50 (normal), 100 (Very hungry)
    
    3. Sleep                                        
        - quality of sleep last night               0 (Extremely bad), 50 (Normal), 100 (Very good)
        - how hard it was to get to sleep           0 (Extremely hard), 50 (Normal), 100 (Very easy)
        - dreams?                                   <50 (none), 50 (yes, normal), 100 (Very intense)
        - sleep paralysis?                          <50 (none), 50 (yes, normal), 100 (Very intense)
        - notes on dreams                                                               (Optional)
    
    4. Chronic Boredom/Inability to experience pleasure
        - morning, afternoon, night                 0 (Extremely bad), 50 (Normal), 100 (Very good)
    
    5. Energy Levels/Motivation
        - morning, afternoon, night                 0 (Extremely bad), 50 (Normal), 100 (Very good)
    
    6. Guilt/Self worth
        - morning, afternoon, night                 0 (Extremely bad), 50 (Normal), 100 (Very good)
    
    7. Concentration   
        - morning, afternoon, night                 0 (Extremely bad), 50 (Normal), 100 (Very good)
    
    8. External Stressors
        - notes on supplements/diet/alcohol et                                           (Optional)
        - notes on exeternal events affecting mood/stress levels                        (Optional)
        - Likelihood of their affect on mood                     0 (not likely), 100 (Very likely)
    
    9. Additional Notes

***

   ###  USER INTERFACE

        LOGIN PAGE
        ENTER DATA PAGE
        GRAPH PAGE 
            -  dropdown for each dataset

***

    ### GENERATING A MOOD ASSESMENT

        to be decided upon
       
`npm start`


