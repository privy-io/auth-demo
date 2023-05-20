import {EllipsisVerticalIcon, LockClosedIcon, SparklesIcon} from '@heroicons/react/24/outline';
import {useContext, useState} from 'react';
import Toggle from './toggle';
import WalletButton from './wallet-button';
import {WalletIcon} from '@heroicons/react/24/outline';
import CanvasSidebarHeader from './canvas-sidebar-header';
import PrivyConfigContext, {PrivyConfigContextType} from '../lib/hooks/usePrivyConfig';
import {classNames} from '../lib/classNames';

function StaticColorPicker({
  hex,
  config,
  setConfig,
  configAttr = 'theme',
  border = false,
}: {
  hex: `#${string}`;
  config: PrivyConfigContextType['config'];
  setConfig: PrivyConfigContextType['setConfig'];
  configAttr?: 'accentColor' | 'theme';
  border?: boolean;
}) {
  return (
    <div
      className={classNames(
        'h-6 w-6 cursor-pointer rounded-full',
        border ? 'border border-gray-300' : '',
      )}
      style={{backgroundColor: hex}}
      onClick={() =>
        setConfig?.({...config, appearance: {...config.appearance, [configAttr]: hex}})
      }
    />
  );
}

type AuthConfiguration = 'wallets' | 'socials';

export default function CanvasSidebarAuthConfig({className}: {className?: string}) {
  const [draggedConfig, setDraggedConfig] = useState<AuthConfiguration | null>(null);
  const {config, setConfig} = useContext(PrivyConfigContext);
  const [defaultConfigStyles, setDefaultConfigStyles] = useState<string>(
    '!border-b-transparent !border-t-transparent cursor-grab',
  );

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, config: AuthConfiguration) => {
    setDraggedConfig(config);
    e.currentTarget.classList.add('!border-transparent', 'rounded-md');
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
      e.currentTarget.classList.add(borderBottom ? '!border-b-privurple' : '!border-t-privurple');
      setDefaultConfigStyles('border-t-transparent cursor-grabbing');
    } else {
      setDefaultConfigStyles('!border-b-transparent !border-t-transparent cursor-grab');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedConfig) return;

    setDefaultConfigStyles('!border-b-transparent !border-t-transparent cursor-grab');

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

  return (
    <div
      className={`no-scrollbar h-full w-[24rem] shrink-0 grow-0 overflow-y-scroll border-r border-gray-300 bg-white ${className}`}
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
              <StaticColorPicker hex="#FFFFFF" config={config} setConfig={setConfig} border />
              <StaticColorPicker hex="#2C2C2C" config={config} setConfig={setConfig} />
              <input
                type="color"
                className="input-color m-0 h-6  w-6 rounded-full bg-conic-gradient bg-cover bg-center p-0"
                onChange={(e) => {
                  setConfig?.({...config, appearance: {theme: e.target.value as `#${string}`}});
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
                className="input-color m-0 h-6  w-6 rounded-full bg-conic-gradient bg-cover bg-center p-0"
                onChange={(e) => {
                  setConfig?.({
                    ...config,
                    appearance: {accentColor: e.target.value as `#${string}`},
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* end: color-selection */}
        {/* start: image-upload */}
        <div className="flex h-10 items-center gap-x-2 rounded-lg border border-dashed border-gray-300 pl-3 pr-1">
          <input
            className="h-8 w-full border-none px-0 text-[0.875rem] placeholder-gray-300 focus:border-none focus:ring-0"
            type="url"
            placeholder="Add image URL or Upload"
          />
          <div className="button-secondary h-8 shrink-0 grow-0 px-4 text-[0.875rem]">Upload</div>
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
            className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-white py-2 pl-1 pr-2`}
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex shrink-0 grow-0 items-center">
                <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
              </div>
              <div className="w-full text-sm">Wallets</div>
              <Toggle
                checked={config.loginMethods!.includes('wallet')}
                onChange={(checked) => {
                  setConfig?.({
                    ...config,
                    loginMethods: checked
                      ? [...(config.loginMethods ?? []), 'wallet']
                      : (config.loginMethods ?? []).filter((m) => m !== 'wallet'),
                  });
                }}
                disabled={!config.loginMethods?.some((m) => ['sms', 'email'].includes(m))}
              />
            </div>
            <WalletButton
              icon={<WalletIcon className="h-4 w-4 text-privurple" strokeWidth={2} />}
              label="External Wallets"
            ></WalletButton>
          </div>
          <div
            draggable
            id="socials"
            onDragOver={handleDragOver}
            onDragStart={(e) => handleDrag(e, e.currentTarget.id as AuthConfiguration)}
            onDrop={handleDrop}
            className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-white py-2 pl-1 pr-2`}
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex shrink-0 grow-0 items-center">
                <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
              </div>
              <div className="w-full text-sm">Email / SMS / Socials</div>
              <Toggle
                checked={config.loginMethods!.some((m) => ['email', 'sms'].includes(m))}
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
                className="w-full"
                type="radio"
                icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                label="Email"
              >
                <input
                  className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                  type="radio"
                  name="email"
                  checked={config?.loginMethods?.includes('email')}
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
                className="w-full"
                type="radio"
                icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                label="SMS"
              >
                <input
                  className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                  type="radio"
                  name="sms"
                  checked={config?.loginMethods?.includes('sms')}
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
            <div className="my-2 h-[1px] w-full shrink-0 grow-0 bg-gray-300"></div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-4">
                <WalletButton
                  className="w-full"
                  type="radio"
                  icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                  label="Google"
                >
                  <input
                    className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                    type="checkbox"
                    name="wallet"
                    checked={config?.loginMethods?.includes('google')}
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
                  className="w-full"
                  type="radio"
                  icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                  label="Apple"
                >
                  <input
                    className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                    type="checkbox"
                    name="wallet"
                    checked={config?.loginMethods?.includes('apple')}
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
                  className="w-full"
                  type="radio"
                  icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                  label="Twitter"
                >
                  <input
                    className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                    type="checkbox"
                    name="wallet"
                    checked={config?.loginMethods?.includes('twitter')}
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
                  className="w-full"
                  type="radio"
                  icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                  label="Discord"
                >
                  <input
                    className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                    type="checkbox"
                    name="wallet"
                    checked={config?.loginMethods?.includes('discord')}
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
                  className="w-1/2"
                  type="radio"
                  icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                  label="Github"
                >
                  <input
                    className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
                    type="checkbox"
                    name="wallet"
                    checked={config?.loginMethods?.includes('github')}
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
          <div className="text-sm text-gray-400">
            With Privy, even non web3 natives can enjoy the benefits of life on chain. Upon sign in,
            we&apos;ll automatically create an “Embedded Wallet” for them to transact with on chain.
          </div>
        </div>
      </div>
      {/* end: authentication-section */}
    </div>
  );
}
