import React, { Component } from 'react';

class Test extends Component {

  constructor(props){
    super(props);

    this.state = {
      switch:0
    }

    this.testmeth1 = this.testmeth1.bind(this);
    this.testmeth2 = this.testmeth2.bind(this);
    this.testmeth3 = this.testmeth3.bind(this);
    this.yes = this.yes.bind(this);
  }

  testmeth1(){
    console.log("one");
  }

  testmeth2(){
    var check = this.yes(1)
    console.log(check);
  }

  testmeth3(){
    {this.testmeth1()}
    {this.testmeth2()}
  }

  yes(value){
    if(value===1){
      return true;
    }
    return false;
  }

  render() {
      {this.testmeth3()}

      const One = () =>(
        <p>one</p>
      )

      const Two = () =>(
        <p>two</p>
      )

      const Three = () =>(
        <p>three</p>
      )

      return(
        <div>
          {this.state.switch === 0 && this.testmeth1()}
          {this.state.switch === 0 && this.testmeth2()}

        </div>
      );

  }
}

export default Test;
