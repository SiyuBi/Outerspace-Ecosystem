# Build Your Own Outer Space Ecosystem!

## Idea
In this interactive ecosystem game, the user would have an option of adding either: sun (stars), planets, moons, or asteroids. We are planning to make it so that they can’t place a planet without a star to orbit around first, and placing an asteroid too close to a planet could destroy it (but if it’s far enough it would just start orbiting). Also depending on the size of the stars/planets they would move faster/slower/collide. We plan on taking some liberties with the realism of how outer space works in order to make it more fun and interesting to play around with (for example sounds would still be implemented even though you cannot actually hear anything in outer space). 
Some things we plan on integrating into our program are buffers (a buffer for each galaxy, for example), and some kind of perlin noise to generate patterns for planets and stars. 

## Classes
<details><summary>expand</summary>
5 classes are used: SolarSystem, Star, Planet, Moon, and Asteroid.
  
————————————————————
### SolarSystem: 
Each should be a buffer frame on top of the main “galaxy” canvas.
#### Properties: 
- x, y positions
- z position (might allow overlapping)
- An array of stars (might allow multiple stars in one system)
- massCenter (= the position of star if only 1 star is present)
- An array of planets
- An array of asteroids
#### Methods:
- Display everything in itself
  
————————————————————
### Star: 
#### Properties: 
- x, y positions
- The solar system it belongs to
- an array of stars (might allow multiple stars in one system)
- An appearance
- Its own mass
#### Methods:
- setAppearance (haven’t decided how to choose yet)

————————————————————
### Planet: 
#### Properties: 
- x, y positions
- The solar system it belongs to
- an array of moons
- An appearance
- Its own mass
#### Methods:
- setAppearance
- move
  
————————————————————
### Moon: 
#### Properties: 
- x, y positions
- The planet it belongs to
- An appearance
- Its own mass
#### Methods:
- setAppearance
- Move

————————————————————
### Asteroid: 
#### Properties: 
- x, y positions
- The solar system it belongs to
- An appearance
- Its own mass
#### Methods:
- setAppearance
- move
</details>
