import React from 'react';
import { Link } from 'react-router';

import loginAction from './loginAction';
import loginStore from './loginStore';
import './login.scss';
import {
    LI_Input,
    LI_Button,
    LI_Tips,
    LI_Loading,
    Container
} from '../../common.config';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            data: loginStore.getAll()
        };
    }
    
    changePhone(event) {
        loginAction.changePhoneInput(event.target.value);
    }

    changeCodeInput(event) {
        loginAction.changeCodeInput(event.target.value);
    }

    getCode(event) {
        console.log('this',loginStore.getAll().active)
        if(!loginStore.getAll().active) return;
        loginAction.getCode()
    }

    doRegist() {
        if(loginStore.getAll().loginBtnHL){
            loginAction.doLogin();
        }
    }

    tipsHide() {
        loginAction.hideTips();
    }

    render() {
        let { 
            loadingShow,
            codeClass,
            codeText,
            tipsText,
            tipsShow
        } = this.state.data;

        return (
            <Container
                scrollable={true}
                className="component-login"
            >   
                <br/>
                <LI_Input 
                    iconAlign='li-align-center' 
                    iconClass='li-icon-tel' 
                    placeholder='请输入您的手机号'
                    type='tel'
                    id='mobilePhone'
                    onChange={this.changePhone}
                />
                <LI_Input 
                    iconAlign='li-align-center' 
                    iconClass='li-icon-yanzhengma' 
                    placeholder='请输入验证码'
                    type='password'
                    colEnd='btn'
                    colEndClick={this.getCode}
                    endBtnClass={codeClass}
                    endBtnText={codeText}
                    endBtnId='getCode'
                    onChange={this.changeCodeInput}
                />
                
                <br/>
                <LI_Button 
                    className='li-btn-submit' 
                    text='立即登录' 
                    click={this.doRegist}
                />

                <LI_Tips
                    text={tipsText}
                    isShow={tipsShow}
                    callback={this.tipsHide}
                    time={3000}
                    top={20}
                />
            </Container>
        )
    }

    componentDidMount() {
        loginStore.bind("change",function(){
            this.setState({
                data: loginStore.getAll()
            })
        }.bind(this));
    }

}

export default Login