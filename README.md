## Send4 input generator
> Create input field with validation . DOC soon!

[![NPM](https://img.shields.io/npm/v/send4-input-generator.svg)](https://www.npmjs.com/package/send4-input-generator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Install

```bash
npm install --save send4-input-generator
```

### Usage

```jsx
import React, { useState } from 'react'

import Input from 'send4-input-generator'

export default function Example(props) {
  const [number, setNumber] = useState(null);
  
  return (
    // Example using a validation func
    <Input
      id="number"
      type="text"
      label="Leave a number"
      lang="ptBR" // Translate some default input errors.
      inputValue={number}
      validation={(n) => !isNaN(n)}
      inputErrorMsg="Não é um número"
      inputRequired={true}
      onChange={(number) => setNumber(number)}
    />

    // Example using pattern
    <Input
      id="email"
      label="Email"
      placeholder="example@mail.com"
      value={email}
      pattern="^([a-z0-9_\-.+])+@([a-z0-9_\-.])+\.([a-z]{2,})$"
      errorMsg="Email invalid"
      required={true}
      onChange={(email) => setEmail(email)}
    />
  );
}
```

### Output

```html
<div class="input-default">
  <label>Something</label>
  <input id="something-id" name="something-name" type="text" value="" required />
  <p>Show error message (if you have)</p>
</div>
```

### License

MIT © [Send4](https://github.com/send4store)
