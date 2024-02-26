mod utils;

use osm_xml::{Member, Reference, OSM};
use utils::{process_coords, process_points};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn process_nodes(text: String, width: f64, height: f64) -> js_sys::Array {
    let doc = OSM::parse(text.as_bytes()).unwrap();
    let bounds = doc.bounds.unwrap();
    let arr = js_sys::Array::new();

    for (_id, node) in doc.nodes.iter() {
        arr.push(&process_points(node, &bounds, width, height));
    }
    arr
}

#[wasm_bindgen]
pub fn process_ways(text: String, width: f64, height: f64) -> js_sys::Array {
    let doc = OSM::parse(text.as_bytes()).unwrap();
    let bounds = doc.bounds.unwrap();
    let arr = js_sys::Array::new();

    for (_id, way) in doc.ways.iter() {
        arr.push(&process_coords(&doc, way, &bounds, width, height));
    }
    arr
}

#[wasm_bindgen]
pub fn process_relations(text: String, width: f64, height: f64) -> js_sys::Array {
    let doc = OSM::parse(text.as_bytes()).unwrap();
    let bounds = doc.bounds.unwrap();
    let arr = js_sys::Array::new();

    for (_id, relation) in doc.relations.iter() {
        for member in relation.members.iter() {
            if let Member::Way(way, t) = member {
                if t == "outer" {
                    if let Reference::Way(way) = &doc.resolve_reference(&way) {
                        arr.push(&process_coords(&doc, way, &bounds, width, height));
                    }
                }
            }
        }
    }
    arr
}
