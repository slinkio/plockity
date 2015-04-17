```javascript
var PlockityAdapter = require('plockity-node');

var plockityApp = new PlockityAdapter({
  apiKey: 'myAPIKey'
});
```

```javascript
locker.vault.insert('mydatakey', {
  ssn: '123456789',
  name: {
    first: 'willy',
    last:  'wonka'
  }
}, {
  disableEncryption: [
    'name'
  ]
}).then(function ( result ) {
  console.log( result.name.first ); // "willy"
  console.log( result.ssn );        // undefined
}).catch(handleError);
```

```javascript
plockityApp.vault.update('mydatakey', { ssn: '123456788' }).then(function ( result ) {
  // Do something with the result
}).catch(handleError);
```

```javascript
plockityApp.vault.compare('mydatakey', { ssn: '123456789', name: { first: "willy" } }).then(function ( result ) {
  console.log( result.ssn );        // false
  console.log( result.name.first ); // true
}).catch(handleError);
```
