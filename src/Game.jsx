import React, { Component } from 'react';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            block : new Array(9).fill(null),
            r_all : 0,
            s_e   : 0,
            count : 0,
            x_sty : "color: deeppink; text-shadow: 0 0 15px deeppink, 0 0 15px deeppink, 0 0 15px deeppink, 0 0 15px deeppink;",
            o_sty : "color: dodgerblue; text-shadow: 0 0 20px dodgerblue, 0 0 20px dodgerblue, 0 0 20px dodgerblue, 0 0 20px dodgerblue;",
            for_x : 0,
            for_o : 0,
            w : 0,
            t : 50,
            l : 50,
            o : 0,
            r : 0
        }
    }
    // Աֆտոմատ Շարժի Գցել;
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({ s_e : 1 });
        }, 500);

        this.timeout2 = setTimeout(() => {
            this.setState({ r_all : 360 });
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timeout, this.timeout2);
    }

    // Ծրագրել Սեխմելուց;
    click_block = (event) => {
        const data = event.target.getAttribute("data"); // Սեխմածի Թիվն է;

        if(this.state.block[data] === null) {
            this.setState({ count : this.state.count + 1 }); // Սկսի Շարժը;
            this.state.block[data] = (this.state.count % 2 === 0) ? "X" : "0";
            
            if(this.state.count === 8) {
                setTimeout(() => {
                   this.setState({ block : new Array(9).fill(null), count : 0 }); 
                }, 3000);
            }

            if(this.state.block[data] === "X") {
                event.target.children[0].setAttribute("style", this.state.x_sty);
            }
            
            else {
                event.target.children[0].setAttribute("style", this.state.o_sty);
            }

        }

        this.winner_logic();
    }

    // Հաղթելու Հավանական Տեղեր;
    winner_list = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    winner_logic = () => {
        const winner = (this.state.count % 2 === 0) ? "X" : "0";
        const block  = this.state.block;

        for(let i = 0; i < this.winner_list.length; i++) {
            let line = this.winner_list[i];

            if(block[line[0]] === winner && block[line[1]] === winner && block[line[2]] === winner) {
                if(winner === "X") {
                    this.setState({ for_x : this.state.for_x + 1 });
                }
                else {
                    this.setState({ for_o : this.state.for_o + 1 });
                }

                setTimeout(() => {
                    if(block[this.winner_list[0][0]] === winner && block[this.winner_list[0][1]] === winner && block[this.winner_list[0][2]] === winner) { this.setState({ t : 16 }); setTimeout(() => { this.setState({ w : 100, o : 1 }) }, 500); }                                                  
                    if(block[this.winner_list[1][0]] === winner && block[this.winner_list[1][1]] === winner && block[this.winner_list[1][2]] === winner) {                            setTimeout(() => { this.setState({ w : 100, o : 1 }) }, 500); }                                                  
                    if(block[this.winner_list[2][0]] === winner && block[this.winner_list[2][1]] === winner && block[this.winner_list[2][2]] === winner) { this.setState({ t : 84 }); setTimeout(() => { this.setState({ w : 100, o : 1 }) }, 500); }                                                  
                    if(block[this.winner_list[3][0]] === winner && block[this.winner_list[3][1]] === winner && block[this.winner_list[3][2]] === winner) { this.setState({ r : 45 }); setTimeout(() => { this.setState({ w : 130, o : 1 }) }, 500); }                                                  
                    if(block[this.winner_list[4][0]] === winner && block[this.winner_list[4][1]] === winner && block[this.winner_list[4][2]] === winner) { this.setState({ r : -45}); setTimeout(() => { this.setState({ w : 130, o : 1 }) }, 500); }                                                  
                }, 500);
                
                setTimeout(() => {
                    this.setState({ block : new Array(9).fill(null), count : 0, w : 0, o : 0 });

                    setTimeout(() => {
                        this.setState({ r : 0, l : 50, t : 50 });
                    }, 500);
                }, 3000);

            }

        }
        
    }



  render() {
    return (
      <div className='game'>
         
         <h3>{this.state.for_x} / X</h3>

         <div className="box" style={{ transform : `rotate3d(1,1,1, ${this.state.r_all}deg) scale(${this.state.s_e})` }}>                       
            {
                this.state.block.map((elem, index) => {
                    return (
                        <div onClick={this.click_block} data={index} className="block" key={index}>
                            <p>{elem}</p>
                        </div>
                    )
                })
            }

            <div className="winner_end" style={{
                width : this.state.w + "%",
                top   : this.state.t + "%",
                left  : this.state.l + "%",
                transform : `translate(-50%, -50%) rotateZ(${this.state.r}deg)`,
                opacity : this.state.o
            }}></div>

         </div>

         <h3>O \ 0</h3>

      </div>
    )
  }
}
