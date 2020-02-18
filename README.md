## send4-input-generator
> Create input field with validation and fully customized<br/>
> DOC soon!!

[![NPM](https://img.shields.io/npm/v/send4-input-generator.svg)](https://www.npmjs.com/package/send4-input-generator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save send4-input-generator
```

## Usage

```jsx
import React, { useState } from 'react'

import Input from 'send4-input-generator'

export default function Example(props) {
  const [number, setNumber] = useState(null);
  
  return (
    <Input
      inputId="number"
      inputType="text"
      inputLabel="Number"
      inputLang="enUS"
      inputValue={number}
      validation={(n) => !isNaN(n)}
      inputErrorMsg="Not a number"
      inputRequired={true}
      onChange={(number) => setNumber(number)}
    />
  );
}
```

## Output

```html
<div id="field-number">
  <label>Number</label>
  <input id="number" type="text" value="" required />
  <p>Show error message (if you have)</p>
</div>
```

## License

MIT © [Send4](https://github.com/send4store)
