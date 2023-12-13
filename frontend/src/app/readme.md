# Global Context (!! unfinished !!)

Since a lot of our util functions are depending on the state of different components,
which aren't neccessary structured hierarchically, our app uses a global context.

Global context is used for keeping state of a chosen database, an active collection,
inferred statistics from the backend and query construction.

The global state is managed through React's context API and is located in the `context` directory:

```plaintext
src/app
|-- _components
|-- utils
|-- context
|   |-- AppContext.js
|-- ...
|-- next.config.js
|-- package.json

```

## AppContext.js

Following imported util functions are using (reading / writing) to a global state

`addToQuery()`

`sendQuery()`

`handleLoadCollections()`

`handleShowDatabases()`

`handleAnalyzeCollection()`

---

# Sources

[React API Reference: useContext](https://react.dev/reference/react/useContext)

[React API Reference: createContext](https://react.dev/reference/react/createContext)