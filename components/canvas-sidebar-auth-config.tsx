import {
  DevicePhoneMobileIcon,
  EllipsisVerticalIcon,
  LockClosedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {useContext, useEffect, useState} from 'react';
import Toggle from './toggle';
import WalletButton from './wallet-button';
import {WalletIcon} from '@heroicons/react/24/outline';
import CanvasSidebarHeader from './canvas-sidebar-header';
import PrivyConfigContext, {
  PrivyConfigContextType,
  privyLogo,
  privyLogoDark,
} from '../lib/hooks/usePrivyConfig';
import {classNames} from '../lib/classNames';
import {isDark} from '../lib/color';
import {isValidUrl} from '@datadog/browser-core';
import Image from 'next/image';
import AppleIcon from './icons/social/apple';
import GitHubIcon from './icons/social/github';

function getLogo(hex: `#${string}`, userLogoUrl: string) {
  return isValidUrl(userLogoUrl) ? userLogoUrl : isDark(hex) ? privyLogoDark : privyLogo;
}

function StaticColorPicker({
  hex,
  config,
  setConfig,
  configAttr = 'theme',
  border = false,
  userLogoUrl = '',
}: {
  hex: `#${string}`;
  config: PrivyConfigContextType['config'];
  setConfig: PrivyConfigContextType['setConfig'];
  configAttr?: 'accentColor' | 'theme';
  border?: boolean;
  userLogoUrl?: string;
}) {
  const logoConfig = configAttr === 'theme' ? {logo: getLogo(hex, userLogoUrl)} : {};
  return (
    <div
      className={classNames(
        'h-6 w-6 cursor-pointer rounded-full border',
        border ? 'border-privy-color-foreground-4' : 'border-privy-color-background',
      )}
      style={{backgroundColor: hex}}
      onClick={() =>
        setConfig?.({
          ...config,
          appearance: {
            ...config.appearance,
            [configAttr]: hex,
            ...logoConfig,
          },
        })
      }
    />
  );
}

type AuthConfiguration = 'wallets' | 'socials';

export default function CanvasSidebarAuthConfig({className}: {className?: string}) {
  const [draggedConfig, setDraggedConfig] = useState<AuthConfiguration | null>(null);
  const {config, setConfig} = useContext(PrivyConfigContext);
  const [defaultConfigStyles, setDefaultConfigStyles] = useState<string>(
    '!border-b-privy-color-background !border-t-privy-color-background cursor-grab',
  );
  const [userLogoUrl, setUserLogoUrl] = useState<string>('');

  useEffect(() => {
    setConfig?.({
      ...config,
      appearance: {
        ...config.appearance,
        logo: getLogo(config?.appearance?.theme as `#${string}`, userLogoUrl),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogoUrl]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, config: AuthConfiguration) => {
    setDraggedConfig(config);
    e.currentTarget.classList.add('!border-privy-color-background', 'rounded-md');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedConfig) return;
    const isTarget = e.currentTarget.id !== draggedConfig;
    const borderBottom =
      (draggedConfig === 'wallets' && config.appearance?.showWalletLoginFirst) ||
      (draggedConfig === 'socials' && !config.appearance?.showWalletLoginFirst);

    if (isTarget) {
      setDefaultConfigStyles('');
      e.currentTarget.classList.add(
        borderBottom ? '!border-b-privy-color-accent' : '!border-t-privy-color-accent',
      );
      setDefaultConfigStyles('!border-t-privy-color-background cursor-grabbing');
    } else {
      setDefaultConfigStyles(
        'border-b-privy-color-background !border-t-privy-color-background cursor-grab',
      );
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedConfig) return;

    setDefaultConfigStyles(
      '!border-b-privy-color-background !border-t-privy-color-background cursor-grab',
    );

    if (draggedConfig === e.currentTarget.id) return;

    setConfig?.({
      ...config,
      appearance: {
        ...config.appearance,
        showWalletLoginFirst: !config.appearance!.showWalletLoginFirst,
      },
    });
    setDraggedConfig(null);
  };

  const hasSocials = config.loginMethods?.some((m) => ['sms', 'email'].includes(m));

  return (
    <div
      className={`no-scrollbar h-full w-[24rem] shrink-0 grow-0 overflow-y-scroll border-r border-privy-color-foreground-4 bg-privy-color-background ${className}`}
    >
      {/* start: customize-section */}
      <div className="px-6 pb-4">
        <CanvasSidebarHeader>
          <SparklesIcon className="h-4 w-4" strokeWidth={2} />
          Customize
        </CanvasSidebarHeader>
        {/* start: color-selection */}
        <div className="flex gap-x-6 pt-4 pb-4">
          <div className="shrink-0 grow-0">
            <div className="pb-2 text-[0.875rem]">Background</div>
            <div className="flex gap-x-2">
              <StaticColorPicker
                hex="#FFFFFF"
                config={config}
                setConfig={setConfig}
                userLogoUrl={userLogoUrl}
                border
              />
              <StaticColorPicker
                hex="#222224"
                config={config}
                setConfig={setConfig}
                userLogoUrl={userLogoUrl}
                border
              />
              <input
                type="color"
                className="input-color m-0 h-6  w-6 rounded-full border border-privy-color-background bg-conic-gradient bg-cover bg-center p-0"
                onChange={(e) => {
                  setConfig?.({
                    ...config,
                    appearance: {
                      ...config.appearance,
                      theme: e.target.value as `#${string}`,
                      logo: getLogo(e.target.value as `#${string}`, userLogoUrl),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="shrink-0 grow-0">
            <div className="pb-2 text-[0.875rem]">Accent</div>
            <div className="flex gap-x-2">
              <StaticColorPicker
                hex="#6A6FF5"
                config={config}
                setConfig={setConfig}
                configAttr="accentColor"
              />
              <StaticColorPicker
                hex="#A7C080"
                config={config}
                setConfig={setConfig}
                configAttr="accentColor"
              />
              <StaticColorPicker
                hex="#38CCCD"
                config={config}
                setConfig={setConfig}
                configAttr="accentColor"
              />
              <StaticColorPicker
                hex="#EF8977"
                config={config}
                setConfig={setConfig}
                configAttr="accentColor"
              />
              <input
                type="color"
                className="input-color m-0 h-6 w-6 rounded-full border border-privy-color-background bg-conic-gradient bg-cover bg-center p-0"
                onChange={(e) => {
                  setConfig?.({
                    ...config,
                    appearance: {
                      ...config.appearance,
                      accentColor: e.target.value as `#${string}`,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* end: color-selection */}
        {/* start: image-upload */}
        <div className="flex h-10 items-center gap-x-2 rounded-lg border border-dashed border-privy-color-foreground-4 pl-3 pr-1">
          <input
            className="h-8 w-full border-none bg-transparent px-0 text-[0.875rem] placeholder-privy-color-foreground-3 focus:border-none focus:ring-0"
            type="url"
            placeholder="Add image URL"
            value={userLogoUrl}
            onChange={(e) => setUserLogoUrl(e.target.value)}
          />
        </div>
        {/* end: image-upload */}
      </div>
      {/* end: customize-section */}
      {/* start: authentication-section */}
      <div className="pb-4">
        <div className="px-6">
          <CanvasSidebarHeader>
            <LockClosedIcon className="h-4 w-4" strokeWidth={2} />
            Authentication
          </CanvasSidebarHeader>
        </div>
        {/* start: auth-ordering-section */}
        <div
          className={classNames(
            'flex flex-col gap-y-4 px-4 py-4',
            !config.appearance?.showWalletLoginFirst ? 'flex-col-reverse' : '',
          )}
        >
          <div
            draggable
            id="wallets"
            onDragOver={handleDragOver}
            onDragStart={(e) => handleDrag(e, e.currentTarget.id as AuthConfiguration)}
            onDrop={handleDrop}
            className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-privy-color-background py-2 pl-1 pr-2`}
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex shrink-0 grow-0 items-center">
                <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
              </div>
              <div className="w-full text-sm">Wallets</div>
              <Toggle
                checked={!!config.loginMethods?.includes('wallet') ?? true}
                onChange={(checked) => {
                  setConfig?.({
                    ...config,
                    loginMethods: checked
                      ? [...(config.loginMethods ?? []), 'wallet']
                      : (config.loginMethods ?? []).filter((m) => m !== 'wallet'),
                  });
                }}
                disabled={!hasSocials}
              />
            </div>
            <WalletButton
              icon={<WalletIcon className="h-4 w-4 text-privy-color-accent" strokeWidth={2} />}
              label="External Wallets"
            ></WalletButton>
          </div>
          <div
            draggable
            id="socials"
            onDragOver={handleDragOver}
            onDragStart={(e) => handleDrag(e, e.currentTarget.id as AuthConfiguration)}
            onDrop={handleDrop}
            className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-privy-color-background py-2 pl-1 pr-2`}
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex shrink-0 grow-0 items-center">
                <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
              </div>
              <div className="w-full text-sm">Email / SMS / Socials</div>
              <Toggle
                checked={!!config.loginMethods?.some((m) => ['email', 'sms'].includes(m))}
                onChange={(checked) => {
                  setConfig?.({
                    ...config,
                    loginMethods: checked
                      ? [...(config.loginMethods ?? []), 'email']
                      : (config.loginMethods ?? []).filter((m) => m === 'wallet'),
                  });
                }}
                disabled={!config.loginMethods?.includes('wallet')}
              />
            </div>
            <div className="flex gap-x-4">
              <WalletButton
                className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                icon={
                  <WalletIcon
                    className={classNames(
                      'h-4 w-4',
                      config?.loginMethods?.includes('email') ?? true
                        ? 'text-privy-color-accent'
                        : '',
                    )}
                    strokeWidth={2}
                  />
                }
                label="Email"
              >
                <input
                  className="shrink-0 grow-0"
                  type="radio"
                  name="email"
                  checked={config?.loginMethods?.includes('email') ?? true}
                  onChange={(e) => {
                    setConfig?.({
                      ...config,
                      loginMethods: e.target.checked
                        ? [...(config.loginMethods ?? []).filter((m) => m !== 'sms'), 'email']
                        : (config.loginMethods ?? []).filter((m) => m !== 'email'),
                    });
                  }}
                />
              </WalletButton>
              <WalletButton
                className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                icon={
                  <DevicePhoneMobileIcon
                    className={classNames(
                      'h-4 w-4',
                      config?.loginMethods?.includes('sms') ?? true
                        ? 'text-privy-color-accent'
                        : '',
                    )}
                    strokeWidth={2}
                  />
                }
                label="SMS"
              >
                <input
                  className="shrink-0 grow-0"
                  type="radio"
                  name="sms"
                  checked={config?.loginMethods?.includes('sms') ?? false}
                  onChange={(e) => {
                    setConfig?.({
                      ...config,
                      loginMethods: e.target.checked
                        ? [...(config.loginMethods ?? []).filter((m) => m !== 'email'), 'sms']
                        : (config.loginMethods ?? []).filter((m) => m !== 'sms'),
                    });
                  }}
                />
              </WalletButton>
            </div>
            <div className="my-2 h-[1px] w-full shrink-0 grow-0 bg-privy-color-foreground-4"></div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-4">
                <WalletButton
                  className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                  icon={
                    <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                      <Image
                        src="/social-icons/color/google.svg"
                        height={18}
                        width={18}
                        alt="Google"
                      />
                    </div>
                  }
                  label="Google"
                >
                  <input
                    className="shrink-0 grow-0"
                    type="checkbox"
                    name="wallet"
                    disabled={!hasSocials}
                    checked={config?.loginMethods?.includes('google') ?? false}
                    onChange={(e) => {
                      setConfig?.({
                        ...config,
                        loginMethods: e.target.checked
                          ? [...(config.loginMethods ?? []), 'google']
                          : (config.loginMethods ?? []).filter((m) => m !== 'google'),
                      });
                    }}
                  />
                </WalletButton>
                <WalletButton
                  className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                  icon={
                    <div
                      className={classNames(
                        'h-[1.125rem] w-[1.125rem] shrink-0 grow-0',
                        isDark(config?.appearance?.theme || '#FFFFFF')
                          ? 'text-white'
                          : 'text-black',
                      )}
                    >
                      <AppleIcon height={18} width={18} />
                    </div>
                  }
                  label="Apple"
                >
                  <input
                    className="shrink-0 grow-0"
                    type="checkbox"
                    name="wallet"
                    disabled={!hasSocials}
                    checked={config?.loginMethods?.includes('apple') ?? false}
                    onChange={(e) => {
                      setConfig?.({
                        ...config,
                        loginMethods: e.target.checked
                          ? [...(config.loginMethods ?? []), 'apple']
                          : (config.loginMethods ?? []).filter((m) => m !== 'apple'),
                      });
                    }}
                  />
                </WalletButton>
              </div>
              <div className="flex gap-x-4">
                <WalletButton
                  className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                  icon={
                    <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                      <Image
                        src="/social-icons/color/twitter.svg"
                        height={18}
                        width={18}
                        alt="Twitter"
                      />
                    </div>
                  }
                  label="Twitter"
                >
                  <input
                    className="shrink-0 grow-0"
                    type="checkbox"
                    name="wallet"
                    disabled={!hasSocials}
                    checked={config?.loginMethods?.includes('twitter') ?? false}
                    onChange={(e) => {
                      setConfig?.({
                        ...config,
                        loginMethods: e.target.checked
                          ? [...(config.loginMethods ?? []), 'twitter']
                          : (config.loginMethods ?? []).filter((m) => m !== 'twitter'),
                      });
                    }}
                  />
                </WalletButton>
                <WalletButton
                  className={classNames('w-full', !hasSocials ? 'opacity-50' : '')}
                  icon={
                    <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                      <Image
                        src="/social-icons/color/discord.svg"
                        height={18}
                        width={18}
                        alt="Discord"
                      />
                    </div>
                  }
                  label="Discord"
                >
                  <input
                    className="shrink-0 grow-0"
                    type="checkbox"
                    name="wallet"
                    disabled={!hasSocials}
                    checked={config?.loginMethods?.includes('discord') ?? false}
                    onChange={(e) => {
                      setConfig?.({
                        ...config,
                        loginMethods: e.target.checked
                          ? [...(config.loginMethods ?? []), 'discord']
                          : (config.loginMethods ?? []).filter((m) => m !== 'discord'),
                      });
                    }}
                  />
                </WalletButton>
              </div>
              <div className="flex gap-x-4 pr-4">
                <WalletButton
                  className={classNames('w-1/2', !hasSocials ? 'opacity-50' : '')}
                  icon={
                    <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                      <GitHubIcon height={18} width={18} />
                    </div>
                  }
                  label="Github"
                >
                  <input
                    className="shrink-0 grow-0"
                    type="checkbox"
                    name="wallet"
                    disabled={!hasSocials}
                    checked={config?.loginMethods?.includes('github') ?? false}
                    onChange={(e) => {
                      setConfig?.({
                        ...config,
                        loginMethods: e.target.checked
                          ? [...(config.loginMethods ?? []), 'github']
                          : (config.loginMethods ?? []).filter((m) => m !== 'github'),
                      });
                    }}
                  />
                </WalletButton>
              </div>
            </div>
          </div>
        </div>
        {/* end: auth-ordering-section */}
        <div className="flex flex-col gap-y-2 px-6 py-4">
          <div className="flex w-full items-center gap-4">
            <div className="w-full text-sm">
              Create and{' '}
              <a href="#" target="_blank">
                Embedded Wallet
              </a>{' '}
              by default
            </div>
            <Toggle
              checked={!!config.createPrivyWalletOnLogin}
              onChange={(checked) => {
                setConfig?.({
                  ...config,
                  createPrivyWalletOnLogin: checked,
                });
              }}
            />
          </div>
          <div className="text-sm text-privy-color-foreground-3">
            With Privy, even non web3 natives can enjoy the benefits of life on chain. Upon sign in,
            we&apos;ll automatically create an “Embedded Wallet” for them to transact with on chain.
          </div>
        </div>
      </div>
      {/* end: authentication-section */}
    </div>
  );
}
