import React, {Component} from 'react';
import './pageSelector.css';

export default class PageSelector extends Component {

    constructor(props) {
        super(props)

        this.state={
            activePage: 1,
        }

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(page) {
        this.setState({activePage:page}, ()=>{this.props.updatePage(page)})
    }

    render() {
        let list=[]
        let pages= this.props.numberOfPages;
        if(this.props.numberOfPages !== 0) {
            if(pages > 10){ pages= 10}
            for(let i=1; i<=pages;i++) {
                list.push(<li 
                    className={this.state.activePage === i ? "page-number active-page": "page-number"} 
                    key={"page-"+i} 
                    onClick={()=>{this.updatePage(i)}} data-page={i}>{i}</li>)
            }
        }

        return(
            <div>
                <ul className="pages-list">
                    {list}
                </ul>
            </div>
        )
    }
}