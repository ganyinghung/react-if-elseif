# Conditional React Compoent Rendering

Instead of this:
```
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
```
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
