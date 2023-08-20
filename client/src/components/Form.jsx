import React, { Component } from 'react';
import { useState, useRef } from "react";

import { FormErrors } from './FormErrors';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchQuery: '',
      formErrors: {searchQuery: ''},
      searchValid: false,
      formValid: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let searchValid = this.state.searchValid;
  
    switch(fieldName) {
      case 'searchQuery':

        let userName = ""
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const userLinkRegex = /^(https?:\/\/)?(www\.)?steamcommunity\.com\/id\/(\w+)(\/myworkshopfiles\/)?\/?$/
          // TODO -- Add a regex expression to check for individual game workshop link
          // TODO -- EXAMPLE : ("https://steamcommunity.com/id/Meylmao/myworkshopfiles/?appid=108600")
        searchValid = value.match(userLinkRegex);

        if (!searchValid){
          searchValid = value.match(usernameRegex);
            if (searchValid){
              userName = searchValid[0];
            }
        }
        else{
           userName = searchValid[3]; // Group 3 captures the username
        }
        
        // !!   Huge shoutout to chatGPT for this one
        // >>   ^: Asserts the start of the string.
        // >>   (https?:\/\/)?: Matches "http://" or "https://" portion optionally.
        // >>   (www\.)?: Matches "www." portion optionally.
        // >>   steamcommunity\.com\/id\/: Matches "steamcommunity.com/id/" literally.
        // >>   (\w+): Captures one or more word characters (letters, digits, or underscores) as the username.
        // >>   (\/myworkshopfiles\/)?: Matches "/myworkshopfiles/" segment optionally.
        // >>   \/?: Matches a trailing "/" optionally.
        // >>   $: Asserts the end of the string.

        // !! username regex pattern explanation
        // >> ^: Asserts the start of the string.
        // >> [a-zA-Z0-9]+: Matches one or more characters that are either lowercase letters, uppercase letters, or digits.
        // >> $: Asserts the end of the string.
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  searchValid: searchValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.searchValid});
  }

  render () {
    return (
      <>
      <div className="introText">Please enter Steam ID or workshop link</div>
      <div className="searchContainer">
        <div className="profileName">
          {/* <span value={message}>{message}</span>
          <a value={userName}>{userName}</a> */}
        </div>
        <div>
          <form className="form-container">
            <input onChange={(event) => this.handleUserInput(event)} name="searchQuery" type="text" placeholder="Search for user ID..." className="input-text form-group" value={this.state.searchQuery}/>
            <button type="submit" className="input-submit" disabled={!this.state.formValid}>Search</button>
          </form>
        </div>
        {/* <p value={followers}>{followers} Followers</p> */}
      </div>
    </>

    )
  }
 }
 export default Form;