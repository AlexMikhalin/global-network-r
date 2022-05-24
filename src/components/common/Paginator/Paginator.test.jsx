import { create } from "react-test-renderer"
import Paginator from "./Paginator"


describe('pagi', () => {
   test('pagi 1', () => {
    const component = create(<Paginator totalItemsCount={11} 
        pageSize={1} portionSize={10} />);
    const root = component.root;
    let spans = root.findAllByType('span');
    expect(spans.length).toBe(10);
   });

   test('pagi 12', () => {
    const component = create(<Paginator totalItemsCount={11} 
        pageSize={1} portionSize={10} />);
    const root = component.root;
    let spans = root.findAllByType('button');
    expect(spans.length).toBe(1);
   });
})