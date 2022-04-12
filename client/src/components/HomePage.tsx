import React, {useState} from 'react';
import { PageHeader, Input, Button, Form, Descriptions } from 'antd';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';

export const HomePage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values: { userName: string, repoName: string }) => {
        const { userName, repoName } = values;
        navigate(`/${userName}/${repoName}`);
    };

    return (
        <div className='site-page-header-ghost-wrapper'>
            <PageHeader
                title='Commit Feed'
                subTitle='This is a browser app that loads commits from a GitHub repository and displays them in a table'
            >
                <Descriptions size='small'>
                    <Descriptions.Item label='Created'>Tao Ning</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Form
                form={form}
                onFinish={onFinish}
                layout='horizontal'
                style={{
                    padding: '26px'
                }}
            >
                <Form.Item label='User Name' name='userName'>
                    <Input placeholder='m3db' />
                </Form.Item>
                <Form.Item label='Repo Name' name='repoName'>
                    <Input placeholder='m3' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default HomePage;
