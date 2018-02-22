/*
 *  Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React,{Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import Widget from '@wso2-dashboards/widget';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import spacing from 'material-ui/styles/spacing';
import ToggleDisplay from 'react-toggle-display';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const styles = {
    
  };

/**
 * Demonstrates how to retrieve date from a widget.
 */
class MyDatePicker extends Widget {

    constructor(props){
        super(props);
        this.state = {
            disableTime:false,
            show: true,
            granularity: "hour",
            open: false,
            value: 1
        };
        this.handleClickEvent=this. handleClickEvent.bind(this);
        this.getFromDate = this.getFromDate.bind(this);
        this.getToDate = this.getToDate.bind(this);
        this.getFromTime = this.getFromTime.bind(this);
        this.getToTime = this.getToTime.bind(this);
        this.handleTimeVisibilityForDay=this.handleTimeVisibilityForDay.bind(this);
        this.handleTimeVisibilityForHour=this.handleTimeVisibilityForHour.bind(this);
        this.getSelectedTime=this.getSelectedTime.bind(this);
        this.publishTime=this.publishTime.bind(this);
        this.focusDatePicker=this.focusDatePicker.bind(this);
        this.focusTimePicker=this.focusTimePicker.bind(this);
        this.handleTimeVisibilityForMonth=this.handleTimeVisibilityForMonth.bind(this);
        this.handleTimeVisibilityForYear=this.handleTimeVisibilityForYear.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.disableDates=this.disableDates.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    
    // handle dialog box open
    handleOpen(e){
        this.setState({
            open: true
        });
    }

    // handle dialog box close
    handleClose(e){
        this.setState({
            open: false
        })
    }

    //handle click event of the apply button
    handleClickEvent(e){
        e.preventDefault()
        const fromTime = this.getSelectedTime(this.getFromDate(e),this.getFromTime(e));
        const toTime = this.getSelectedTime(this.getToDate(e),this.getToTime(e));
        this.publishTime(fromTime, toTime);
        this.handleOpen(e);  
    }

    //get the selected date as from
    getFromDate(e){
        e.preventDefault()
        const fromDate = this.refs.fromDate.state.date
        return fromDate;
    }

    //get the selected time as from
    getFromTime(e){
        e.preventDefault()
        const fromTime = this.refs.fromTime.state.time
        return fromTime;   
    }

    //get the selected date as to
    getToDate(e){
        e.preventDefault()
        const toDate = this.refs.toDate.state.date
        return toDate;
    }
    
    //get the selected time as to
    getToTime(e){
        e.preventDefault()
        const toTime = this.refs.toTime.state.time
        return toTime;
    }

    //Get the selected time in a formatted way
    getSelectedTime(mDate, mTime){
        if(this.state.granularity=="hour"){
            const mYear = mDate.getFullYear()
            const mMonth = mDate.getMonth()
            var mMonth = mMonth + 1
            const mDay = mDate.getDate()
            const mHour = mTime.getHours()

            var fromatedDate = mYear+"-"+mMonth+"-"+mDay+" "+mHour+":"+"00:00";
            return fromatedDate;  
        }

        if(this.state.granularity=="day"){
            const mYear = mDate.getFullYear()
            const mMonth = mDate.getMonth()
            var mMonth = fromMonth + 1
            const mDay = mDate.getDate()

            var fromatedDate = mYear+"-"+mMonth+"-"+mDay+" "+"00:00:00";
            return fromatedDate;  
        }

        if(this.state.granularity=="month"){
            const mYear = mDate.getFullYear()
            var mMonth = mDate.getMonth() + 1

            var fromatedDate = mYear+"-"+mMonth+"-"+"01"+" "+"00:00:00";
            return fromatedDate;  
        }

        if(this.state.granularity=="year"){
            const mYear = mDate.getFullYear()
            var fromatedDate = mYear+"-"+"01"+"-"+"01"+" "+"00:00:00";
            return fromatedDate;
        }
    } 

    //publish selected time range to the subscriber widget as a string
    publishTime(fromTime, toTime){
        const n = fromTime+"_"+toTime+"_"+this.state.granularity
        super.publish(n);
    }

    //handle the time visibility according to the selected granularity
    handleTimeVisibilityForHour(e){
        this.setState({
            disableTime:false,
            show:true,
            granularity:"hour"
        });
        this.focusDatePicker(e);
    }

    handleTimeVisibilityForDay(e){
        this.setState({
            disableTime:true,
            show : false,
            granularity:"day"
        });
        this.focusDatePicker(e);
    }

    handleTimeVisibilityForMonth(e){
        this.setState({
            disableTime:true,
            show:false,
            granularity:"month"
        });
        this.focusDatePicker(e);
    }

    handleTimeVisibilityForYear(e){
        this.setState({
            disableTime:true,
            show:false,
            granularity:"year"
        });
        this.focusDatePicker(e);
    }

    focusDatePicker(e){
        this.refs.fromDate.focus();
    }

    focusTimePicker(){
        if(this.state.show){
            this.refs.fromTime.focus()
        }
    }

    //disable calander dates
    disableDates(date) {
        if(this.state.granularity=="month" || this.state.granularity=="year"){
            return  date.getDate() !== 1 
        } 
      }

    //display message
    displayMessage(){

    }

    //handle drop down menu1 items
    handleChange(event, index, value){
        this.setState({value})
    }

    render() {

        const actions = [
            <FlatButton
              label="OK"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <table>
                        <tr>
                            <td width="60%">
                                <Tabs>
                                    <Tab label="Hour" name={"hour"} onActive={this.handleTimeVisibilityForHour}></Tab>
                                    <Tab label="Day" name={"day"} onActive={this.handleTimeVisibilityForDay}/>
                                    <Tab label="Month" name={"month"} onActive={this.handleTimeVisibilityForMonth}/>
                                    <Tab label="Year" name={"year"} onActive={this.handleTimeVisibilityForYear} />
                                </Tabs>
                            </td>                   
                            <td width="20%">From:
                                <DatePicker 
                                    container="inline" 
                                    hintText="Select Date" 
                                    ref="fromDate" 
                                    autoOk="true"
                                    shouldDisableDate={this.disableDates} 
                                    onChange= {(e) => { this.refs.toDate.focus() }}/>
                            </td>
                            <td width="20%">To:
                                <DatePicker 
                                    container="inline" 
                                    hintText="Select Date" 
                                    ref="toDate" 
                                    autoOk="true" 
                                    shouldDisableDate={this.disableDates}
                                    onChange= {this.focusTimePicker}/>
                            </td>
                        </tr>
                        <tr>
                            <td width="60%">
                                <RaisedButton 
                                    label="Apply" 
                                    fullWidth={true} 
                                    onClick={this.handleClickEvent}/>
                            </td>
                            <td>
                                <ToggleDisplay show={this.state.show}>
                                    <TimePicker 
                                        hintText="Select Time" 
                                        ref="fromTime" 
                                        autoOk="true"
                                        minutesStep={60}
                                        disabled={this.state.disableTime} 
                                        onChange= {(e) => { this.refs.toTime.focus() }}/>
                                </ToggleDisplay></td>
                            <td>
                                <ToggleDisplay show={this.state.show}>
                                    <TimePicker 
                                        hintText="Select Time" 
                                        ref="toTime"   
                                        autoOk="true" 
                                        minutesStep={60}
                                        disabled={this.state.disableTime} />
                                </ToggleDisplay></td>   
                        </tr>
                        </table>
                        <table>
                        <tr>
                            <td width="20%">Server</td>
                            <td width="20%">Service</td>
                            <td width="20%">Method</td>
                        </tr>
                        <tr>
                            <td width="20%">
                            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All" />
                            <MenuItem value={2} primaryText="Server1" />
                            <MenuItem value={3} primaryText="Server2" />
                            <MenuItem value={4} primaryText="Server3" />
                            </DropDownMenu>
                            </td>

                            <td width="20%">
                            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All" />
                            <MenuItem value={2} primaryText="Sevice1" />
                            <MenuItem value={3} primaryText="Sevice2" />
                            <MenuItem value={4} primaryText="Sevice3" />
                            </DropDownMenu>
                            </td>

                            <td width="20%">
                            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All" />
                            <MenuItem value={2} primaryText="Method1" />
                            <MenuItem value={3} primaryText="Method2" />
                            <MenuItem value={4} primaryText="Method3" />
                            </DropDownMenu>
                            </td>
                       
                        </tr>
                        
                    </table>

                    <div>
                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                        <p>You have selected granularity as  {this.state.granularity}<br></br>
                            Selected range from:
                        </p>                     
                        </Dialog>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

global.dashboard.registerWidget("MyDatePicker", MyDatePicker);
