import {
     LockOutlined,
        MobileOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import {  App, Tabs, message } from 'antd';
  import { useState } from 'react';
  import style from  './index.module.less';
  type LoginType = 'phone' | 'account';
  
const LoginPage = () => {

    const [loginType, setLoginType] = useState<LoginType>('phone');
    const items = [  
      { key: 'phone', label: '手机号登录'}
    ]; 
  
    return (
      <App>
        <ProConfigProvider hashed={false}>
          <div className={style.container}>
            <LoginForm
              logo="http://zy-server.oss-cn-beijing.aliyuncs.com/images/WechatIMG272.jpg"
            >
              <Tabs
                centered
                activeKey={loginType}
                onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                items={items}
              >
              </Tabs>
              {loginType === 'phone' && (
                <>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <MobileOutlined className={'prefixIcon'} />,
                    }}
                    name="mobile"
                    placeholder={'手机号'}
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号！',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '手机号格式错误！',
                      },
                    ]}
                  />
                  <ProFormCaptcha
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    captchaProps={{
                      size: 'large',
                    }}
                    placeholder={'请输入验证码'}
                    captchaTextRender={(timing: unknown, count: unknown) => {
                      if (timing) {
                        return `${count} ${'获取验证码'}`;
                      }
                      return '获取验证码';
                    }}
                    name="captcha"
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ]}
                    onGetCaptcha={async () => {
                      message.success('获取验证码成功！验证码为：1234');
                    }}
                  />
                </>
              )}
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  忘记密码
                </a>
              </div>
            </LoginForm>
          </div>
        </ProConfigProvider>
      </App>
    );
  };
  export default LoginPage;