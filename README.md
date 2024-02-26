# Display OSM queries in a HTML5 Canvas

Display an HTML5 Canvas of a section of OSM, using a WASM module for processing result from the [OSM API](https://wiki.openstreetmap.org/wiki/Overpass_API).

*Largely inspired by [Mary Knize's project](https://mary.codes/blog/programming/translating_openstreetmaps_to_HTML5_canvas_rust_wasm/)*

## Build and run

```
wasm-pack build --target web --dev --out-dir www/pkg
http-server www/
```

`--dev` can be skipped for a release build (longer compile time)

### Install `http-server`

```
npm install -g http-server
```

