# Components

MyDocs ships a set of pre-built UI components you can drop into any MDX file.

## `<Callout>`

Highlight important information.

```mdx
<Callout type="info">This feature is available from v2.0 onwards.</Callout>
```

**Props**

| Prop    | Type                                           | Default     |
| ------- | ---------------------------------------------- | ----------- |
| `type`  | `"info" \| "warning" \| "danger" \| "success"` | `"info"`    |
| `title` | `string`                                       | `undefined` |

---

## `<CodeGroup>`

Display multiple code snippets in a tabbed view.

````mdx
<CodeGroup>
  ```ts title="TypeScript"
  const x: number = 42;
````

```js title="JavaScript"
const x = 42;
```

</CodeGroup>
```

---

## `<Steps>`

Numbered step-by-step instructions.

```mdx
<Steps>
  <Step title="Install">Run `npm install`</Step>
  <Step title="Configure">Edit `docs.config.ts`</Step>
  <Step title="Deploy">Run `npm run build`</Step>
</Steps>
```

---

## `<Tabs>`

Organise related content in tabs.

```mdx
<Tabs>
  <Tab title="macOS">brew install mydocs</Tab>
  <Tab title="Linux">apt install mydocs</Tab>
  <Tab title="Windows">winget install mydocs</Tab>
</Tabs>
```
