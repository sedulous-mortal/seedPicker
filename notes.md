# Typos and Errors
> I think the dialogue about "Amish Tomatoess" should be about "Amber Tomatoes" in the Amber Tomatoes description section

# Missing Information Fields
{
        "Name": , <- we usually have this
        "Desc": , <- we usually have this
        "DaysToGerm": ,
        "DaysToProduce": ,
        "Determination": , <- when is this applicable??
        "SeedCount": , <- we usually have this
        "Price": , <- we usually have this
        "NutritionInfo": , <- we usually have this
        "HowToGrow": , <- we usually have this
        "PlantingDepthInInches": ,
        "CanStandFrost": ,
        "SpacingInInches": ,
        "Frequency": ,
        "Img": ,
    }

# Suggestions
- add null-checking  for the whole UL, if no seeds are defined or the list is empty show a nice message that  you should get some seeds
- your appends are causing your list items  to show up Z-A from top to bottom, oops.