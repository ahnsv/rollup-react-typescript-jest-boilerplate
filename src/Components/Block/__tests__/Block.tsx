import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Block from "../Block";

Enzyme.configure({ adapter: new Adapter() });
let block: ShallowWrapper<undefined, undefined>;
beforeEach(() => block = shallow(<Block />));
// checking that all is fine and component has been rendered
it("should render without error", () =>
    expect(block.length).toBe(1));
