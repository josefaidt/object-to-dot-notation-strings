# type transformation

playing around with types and deeply-nested objects. it takes a deeply-nested object and returns dot-notation-style strings for property accessors

```ts
import { it, expect } from 'bun:test'
import { transform } from './transform'

const deeplyNestedObject = {
  hello: {
    world: 'asdf',
    there: 'asdf',
    you: 'asdf',
  },
  is: {
    it: {
      me: 'asdf',
      or: [
        {
          you: 'asdf',
        },
      ],
    },
  },
  url: 'asdf',
}

it('should generated dot-notation string keys', () => {
  const transformed = transform(deeplyNestedObject)
  const expected = [
    'hello.world',
    'hello.there',
    'hello.you',
    'is.it.me',
    'is.it.or.0.you',
    'url',
  ]
  expect(transformed).toEqual(expected)
})
```
