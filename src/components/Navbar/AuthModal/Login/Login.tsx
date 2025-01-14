import React, { useContext, useState } from 'react';
import {
    ModalOverlay,
    Background,
    Button,
    Form,
    GlassPanel,
    Input,
    SwitchText,
    Spinner,
    InputWrapper, ToggleButton
} from "../../styles";

import AuthService from "api/services/AuthService";
import AuthContext from "providers/Auth/AuthContext";

import UserService from "api/services/userService";
import UserContext from "providers/User/UserContext";

interface LoginProps {
    onClose: () => void,
    onCreateAccount: () => void,
}

const Login = ({ onClose, onCreateAccount }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { token, setToken } = useContext(AuthContext);
    const { user, setUser } = useContext(UserContext);

    const getUserData = async () => {
        try {
            const loginResponse = await AuthService.login({ email, password });
            const { data: { token }} = loginResponse;
            setToken(token);

            const userResponse = await UserService.fetchUserData(token);
            const { data } = userResponse;
            console.warn('Logged in user: ', data)
            setUser(data);

            setErrorMessage('');
            onClose();
        } catch (e) {
            setErrorMessage('Login Failed. Please check your credentials: ');
        } finally {
            setLoading(false);
        }
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please fill out all fields');
            return;
        }

        setLoading(true)
        await getUserData();
    }

    return (
        <ModalOverlay>
            <Background />
            <GlassPanel>
                <Form>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputWrapper>
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                        <ToggleButton onClick={(e) => {
                            e.preventDefault();

                            setShowPassword(!showPassword)}
                        }>
                            {showPassword ? "Hide" : "Show"}
                        </ToggleButton>
                    </InputWrapper>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <Button onClick={onLogin} disabled={loading}>
                        { loading && <Spinner /> }
                        { loading ? "Logging in..." : "Login" }
                    </Button>
                    <SwitchText>
                        New here? <a href="#" onClick={onCreateAccount}>Create an Account</a>
                    </SwitchText>
                </Form>
                <Button onClick={onClose} style={{ marginTop: "20px" }}>
                    Close
                </Button>
            </GlassPanel>
        </ModalOverlay>
    );
};

export default Login;
