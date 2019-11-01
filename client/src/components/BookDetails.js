import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/book'

class BookDetails extends Component {
    displayBookDetails() {
        const { book } = this.props.data 
        if (book) {
            return (
                <div>
                    <h3>{book.name}</h3>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul>
                        {
                            book.author.books.map(item => {
                                return <li key={item.id}> {item.name} </li>
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected ...</div>
        }
    }
    render() {
        return (
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)