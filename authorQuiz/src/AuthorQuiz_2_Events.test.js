import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
// npm install enzyme enzyme-adapter-react-16 --save-dev
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// connecting Enzyme to the Enzyme React adapter
Enzyme.configure({ adapter: new Adapter() })

const state = {
    turnData : {
        books: ['The Shining',
        'IT',
        'Roughing it'],
        author: {
            name : 'Mark Twain',
            imageUrl: 'images/authors/marktwain.jpg',
            imageSource:'Wikimedia Commons',
            books : ['The Adventures of Huckleberry Finn',
            'Life on the Missisippi',
            'Roughing it']
        }
    },
    highlight: 'none'
}

describe("Author Quiz", () => {

    it("renders without crashing", ()=>{
       const div = document.createElement("div");
       ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    });

    describe("When no answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            // enzyme mount function to render an AuthorQuiz
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>);
        });

        it("it should have no background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("");
        });
    }

    );

    describe('When the wrong answer has been selected', () => {
        let wrapper;

        beforeAll(() => {
            wrapper = mount(
                <AuthorQuiz {...(Object.assign({}, state, {highlight:'wrong'}))} onAnswerSelected={() => {}} />);
        });

        it('should have a red background color', () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");

        });

    });


    describe("When the correct answer has been selected", () => {

        let wrapper;
        beforeAll( () => {
            wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight:'correct'}))} onAnswerSelected={()=>{}}/>);
         });

        it("it should be a green background", ()=>{
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("green");
        });
    }

    );

    describe("When the first answer is selected", () => {

        let wrapper;
        // jest.fn : creates a mock function
        const handleAnswerSelected = jest.fn();
        beforeAll( () => {
            // handleAnswerSelected is a call back
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
            wrapper.find('.answer').first().simulate('click');
         });

         it("onAnswerSelected should be called", () => {
             expect(handleAnswerSelected).toHaveBeenCalled();
         });

         it("should receive The Shining", () => {
            expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
        });

    }

    );
});

