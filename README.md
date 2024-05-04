## Conditional React Component Rendering

### Why?
Instead of this:
```jsx
<Container>
  {
    condition1 ?
      <Element1 />
    :
      (
        condition2 ?
          <Element2 />
        :
          (
            condition3 ?
              <Element3 />
            :
              <Element4 />
          )
      )
  }
</Container>
```

Do this:
```jsx
<Container>
  {
    _if(condition1)
      .then( <Element1 /> )
    .elseif(condition2)
      .then( <Element2 /> )
    .elseif(condition3)
      .then( <Element3/> )
    .else( <Element4 /> )
    .endif()
  }
</Container>
```

### Installation
```
npm i @yhg.io/react-if-elseif
```

### Usage
```jsx
import { _if } from '@yhg.io/react-if-elseif';
```
Then see example above.

You may add as many `.elseif()` conditions as you like but always remember to call `.endif()` at the end.
