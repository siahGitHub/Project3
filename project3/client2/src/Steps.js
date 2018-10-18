import React, { Component } from 'react';
import { Form, Button, Grid, Message, List, Input, Menu, Header, Icon, Select } from 'semantic-ui-react';
import { states } from './States.js';
import API from "./utils/API";

export const Welcome = (props) => {
  return(
    <Grid>
      <Grid.Row>
      <Header as='h2' icon textAlign='center'>
         <Icon name='write' circular/>
         <Header.Content>
         <p>Welcome to Recipient Application Form! Lets get started</p>
         </Header.Content>
     </Header>
     </Grid.Row>
     {/*
      <Grid.Column floated='left' width={5}>
      </Grid.Column>
     */}
     <Grid.Row>
      <Grid.Column floated='left' width={5}>
        <Button primary onClick={() => props.next(states.VEHICLE_CHOOSE)}>Start</Button>
      </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export class VehicleChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      errors: []
    };
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
  }

  _onChange(e, { value }) {
    this.setState({ 
      value: value,
      errors: []
    });
  }

  _validate(e) {
    e.preventDefault();
    let value = this.state.value;
    if (value === 'male') {
      this.props.next(states.MALE);
    } else if (value === 'female') {
      this.props.next(states.FEMALE);
    } else {
      this.setState({
        errors: ['Please choose a gender for the recipient']
      });
    }
  }

  _back() {
    this.props.back(states.WELCOME)
  }

  render() {
    return(
      <Form>
        { this.state.errors.length > 0 &&
        <Message negative>
          <p>{this.state.errors.join('. ')}</p>
        </Message>
        }
        <Form.Field>
          <label>The gender of the Recipient:</label>
          <Form.Radio 
            label='A female' 
            value='female'
            checked={this.state.value === 'female'}
            onChange={this._onChange}/>
          <Form.Radio 
            label='A male' 
            value='male'
            checked={this.state.value === 'male'}
            onChange={this._onChange}/>
        </Form.Field>
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button secondary onClick={this._back}>Back</Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button primary onClick={this._validate}>Next</Button>
          </Grid.Column>
        </Grid>
       </Form>
    );
  }
}

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      type: this.props.type,
      firstName: null,
      lastName: null,
      age: null,
      schoolGrade: null,
      recipientID: null,
      status1: null,
      shirt: null,
      items: [],
      errors: []
    }
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
    this._back = this._back.bind(this);
  }

  _back(e) {
    e.preventDefault();
    this.props.back(states.VEHICLE_CHOOSE);
  }

  _onChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  _validate(e) {
    e.preventDefault();
    // You can add your validation logic here
    let value = this.state.value;
    if (value === 'yes-shirt') {
      this.setState({ status1 : ['Y'] });
    } else if (value === 'no-shirt') {
      this.setState({ status1 : ['N'] });
    } else {
      this.setState({
        errors: ['Please select Yes/No']
      });
    }
    this.props.saveForm({
      type: this.props.type,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      schoolGrade: this.state.schoolGrade
    });
    API.saveRecipient({
      gender: this.props.type,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      schoolGrade: this.state.schoolGrade,
      favoriteColor: "Green",
      items: [{article:this.state.shirt, size:"m", donated:0, incorrect:0, status: this.state.status1}]
      })
        .then(res => {
          console.log(res);
          this.setState({ recipientID: res.data._id});
        })
        .catch(err => console.log(err));
    this.props.next(this.props.nextState);
  }

  render() {

  
    return(
      <Form>
        { this.state.errors.length > 0 &&
        <Message negative>
          <p>{this.state.errors.join('. ')}</p>
        </Message>
        }
        <h2>{this.props.type} details:</h2>
        <Form.Group widths='equal'>
          <Form.Input 
            name='firstName'
            value={this.state.firstName}
            onChange={this._onChange}
            label='First Name' 
            placeholder='First Name'/>
          <Form.Input 
            name='lastName'
            value={this.state.lastName}
            onChange={this._onChange}
            label='Last Name' 
            placeholder='Last Name'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            name='age'
            value={this.state.age}
            onChange={this._onChange}
            label='Age' 
            placeholder='Age'/>
          <Form.Input 
            name='schoolGrade'
            value={this.state.schoolGrade}
            onChange={this._onChange}
            label='School Grade' 
            placeholder='School Grade'/>
        </Form.Group>
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button secondary onClick={this._back}>Back</Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button primary onClick={this._validate}>Next</Button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export const FemaleForm = (props) => {
  return(
    <BaseForm
      type='Female'
      next={props.next}
      back={props.back}
      saveForm={props.saveForm}
      //nextState={states.CONFIRM}/>
      nextState={states.BOAT_DETAIL}/>
  );
}

export const MaleForm = (props) => {
  return(
    <BaseForm
      type='Male'
      next={props.next}
      back={props.back}
      saveForm={props.saveForm}
      //nextState={states.CONFIRM}/>
      nextState={states.BOAT_DETAIL}/>
  );
}

export class BoatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      articleSize: null,
      article2: null,
      article2Size: null,
      article3: null,
      article3Size: null,
      article4: null,
      article4Size: null
    };
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
  }
  _onChange= (e, { value }) => this.setState({ value })
  

  
  _validate(e) {
    // You can add validation logic here
    /*
    this.props.saveForm({
      article1: this.state.article1,
      article2: this.state.article1Size,
      donated: this.state.donated,
      recipient: this.props.recipientID
    });
    */
   
    API.saveRecipientItems({
      article: this.state.article1,
      size: this.state.article1Size,
      donated: 0,
      incorrect: 0,
      status: "verified",
      recipient: this.state.recipientID
    }
    )
        .then(res => {
          console.log(res);
          console.log(this.props.vehicles);
          this.setState({ recipientID: res.data._id});
        })
        .catch(err => console.log(err));
    this.props.next(states.CONFIRM)
  }

  //handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    let articleNames = [
      {
        key:'S',
        text: 'Shirt',
        value: 'Shirt'
      },
      {
        key:'P',
        text: 'Pants',
        value: 'Pants'
      },
      {
        key:'K',
        text: 'Socks',
        value: 'Socks'
      },
      {
        key: 'C',
        text: 'Coat',
        value: 'Coat'
      },
      {
        key: 'H',
        text: 'Hoodie',
        value: 'Hoodie'
      },
      {
        key: 'U',
        text: 'Undergarment',
        value: 'Undergarment'
      },
      {
        key: 'N',
        text: 'Sneaker',
        value: 'Sneaker'
      },
      {
        key: 'B',
        text: 'Boot',
        value: 'Boot'
      }
    ];
    let articleSizes = [
      {
        text: 'Small',
        value: 'Small'
      },
      {
        text: 'Medium',
        value: 'Medium'
      },
      {
        text: 'Large',
        value: 'Large'
      },
      {
        text: 'X-Large',
        value: 'X-Large'
      },
      {
        text: '2X-Large',
        value: '2X-Large'
      },
      {
        text: '3X-Large',
        value: '3X-Large'
      }
    ];
    return (
      <Form>
        <Form.Group>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Select fluid control={Select} name='Article1' label='Article' options={articleNames} placeholder='Article' onChange={this._onChange}/>
              </Grid.Column>
              <Grid.Column>
              <Form.Select fluid control={Select} name='Article1size' label='Size' onChange={this._onChange} options={articleSizes} placeholder='Size' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
            <Grid.Column>
                <Form.Select fluid control={Select} name='Article2' label='Article' onChange={this._onChange} options={articleNames} placeholder='Article' />
              </Grid.Column>
              <Grid.Column>
                <Form.Select fluid control={Select} name='Article2size' label='Size' onChange={this._onChange} options={articleSizes} placeholder='Size' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
            <Grid.Column>
                <Form.Select fluid control={Select} name='Article3' label='Article' onChange={this._onChange} options={articleNames} placeholder='Article' />
              </Grid.Column>
              <Grid.Column>
              <Form.Select fluid control={Select} name='Article3size' label='Size' onChange={this._onChange} options={articleSizes} placeholder='Size' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
            <Grid.Column>
                <Form.Select fluid control={Select} name="Article4" label='Article' onChange={this._onChange} options={articleNames} placeholder='Article' />
              </Grid.Column>
              <Grid.Column>
              <Form.Select fluid control={Select} name="Article4size" label='Size' onChange={this._onChange} options={articleSizes} placeholder='Size' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button secondary onClick={this._back}>Back</Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button primary onClick={this._validate}>Next</Button>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

export class Confirm extends React.Component {
  
  _genReport(e){
    //e.preventDefault();
    API.getReports()
      .then(res =>
        console.log("report generated")
      )
      .catch(err => console.log(err));
  };

  render() {
    /*
     * Here is our final step. In the real world, we would
     * obviously do something more complicated than a javascript
     * alert
     */
    return(
      <Grid>
        <Grid.Row>
          <p>Recipients Created:</p>
          <List>
            {this.props.vehicles.map((i) => {
              return(
                <List.Item>
                  <List.Icon name={i.type === 'Female' ? 'female' : 'male' } />
                  <List.Content>{i.firstName+" "+i.lastName}</List.Content>
                </List.Item>
              );
            })}
          </List>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated='left' width={5}>
            <Button onClick={() => this.props.next(states.VEHICLE_CHOOSE)}>Add Another</Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button primary onClick={this._genReport} download>Generate Report</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export class MenuExampleNameProp extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }
/*
    API.getReports()
      .then(console.log("report generated")
      )
      .catch(err => console.log(err));
  }
*/
  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='work list'
          active={activeItem === 'work list'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='reports'
          active={activeItem === 'reports'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

