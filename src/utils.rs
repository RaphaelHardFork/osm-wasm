use osm_xml::{Bounds, Node, Reference, Way, OSM};
use wasm_bindgen::JsValue;

pub fn process_points(node: &Node, bounds: &Bounds, width: f64, height: f64) -> js_sys::Array {
    let y = map_points(node.lat, bounds.minlat, bounds.maxlat, height, 0.0); // inverted to match canvas coordinate
    let x = map_points(node.lon, bounds.minlon, bounds.maxlon, 0.0, width);
    let point = js_sys::Array::new();

    point.push(&JsValue::from_f64(x));
    point.push(&JsValue::from_f64(y));
    point
}

pub fn process_coords(
    doc: &OSM,
    way: &Way,
    bounds: &Bounds,
    width: f64,
    height: f64,
) -> js_sys::Array {
    let coords = js_sys::Array::new();

    for node in way.nodes.iter() {
        if let Reference::Node(node) = &doc.resolve_reference(&node) {
            let point = process_points(node, &bounds, width, height);
            coords.push(&point);
        }
    }
    coords
}

fn map_points(value: f64, start1: f64, stop1: f64, start2: f64, stop2: f64) -> f64 {
    ((value - start1) / (stop1 - start1) * (stop2 - start2) + start2).floor()
}
