import {EllipsisVerticalIcon, LockClosedIcon, SparklesIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';
import type {AuthConfiguration, SocialsConfiguration, WalletsConfiguration} from '../types';
import Toggle from './toggle';
import WalletButton from './wallet-button';
import {WalletIcon} from '@heroicons/react/24/outline';
import CanvasSidebarHeader from './canvas-sidebar-header';

export default function CanvasSidebarAuthConfig({className}: {className?: string}) {
  const [draggedConfig, setDraggedConfig] = useState<
    WalletsConfiguration | SocialsConfiguration | null
  >(null);
  const [defaultConfigStyles, setDefaultConfigStyles] = useState<string>(
    '!border-b-transparent !border-t-transparent cursor-grab',
  );
  const [authConfiguration, setAuthConfiguration] = useState<AuthConfiguration>([
    {name: 'wallets', enabled: true, order: 1},
    {
      name: 'socials',
      order: 2,
      enabled: true,
      email: true,
      sms: true,
      options: {
        discord: true,
        github: true,
        google: true,
        twitter: true,
        apple: true,
      },
    },
  ]);

  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    config: WalletsConfiguration | SocialsConfiguration,
  ) => {
    setDraggedConfig(config);
    e.currentTarget.classList.add('!border-transparent', 'rounded-md');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedConfig) return;
    const isTarget: boolean = e.currentTarget.id !== draggedConfig.name;

    if (isTarget && draggedConfig.order === 1) {
      setDefaultConfigStyles('');
      e.currentTarget.classList.add('!border-b-privurple');
      setDefaultConfigStyles('border-t-transparent cursor-grabbing');
    } else if (isTarget && draggedConfig.order === 2) {
      setDefaultConfigStyles('');
      e.currentTarget.classList.add('!border-t-privurple');
      setDefaultConfigStyles('border-b-transparent cursor-grabbing');
    } else {
      setDefaultConfigStyles('!border-b-transparent !border-t-transparent cursor-grab');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log(
    //   `drop: dropEffect = ${e.dataTransfer.dropEffect} ; effectAllowed = ${e.dataTransfer.effectAllowed}`,
    // );
    if (!draggedConfig) return;
    setDefaultConfigStyles('!border-b-transparent !border-t-transparent cursor-grab');
    const dragBox = authConfiguration.find((config) => config.name === draggedConfig.name);
    const dropBox = authConfiguration.find((config) => config.name === e.currentTarget.id);

    if (!dropBox || !dragBox) return;

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newConfiguration = authConfiguration.map((config) => {
      if (config.name === draggedConfig.name) {
        config.order = dropBoxOrder;
      }
      if (config.name === e.currentTarget.id) {
        config.order = dragBoxOrder;
      }
      return config;
    });

    setAuthConfiguration(newConfiguration);
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
              <div className="h-6 w-6 rounded-full border border-gray-300 bg-white"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <input
                type="color"
                className="input-color bg-conic-gradient m-0  h-6 w-6 rounded-full bg-cover bg-center p-0"
              />
            </div>
          </div>
          <div className="shrink-0 grow-0">
            <div className="pb-2 text-[0.875rem]">Accent</div>
            <div className="flex gap-x-2">
              <div className="h-6 w-6 rounded-full border border-gray-300 bg-white"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <div className="h-6 w-6 rounded-full bg-gray-900"></div>
              <input
                type="color"
                className="input-color bg-conic-gradient m-0  h-6 w-6 rounded-full bg-cover bg-center p-0"
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
        {/* A drag and drop for two sections with react-beautiful-dnd */}
        {/* start: auth-ordering-section */}
        <div className="flex flex-col gap-y-4 px-4 py-4">
          {authConfiguration
            .sort((a, b) => a.order - b.order)
            .map((config, index) => {
              if (config.name === 'wallets') {
                return (
                  <div
                    draggable
                    id={config.name}
                    onDragOver={handleDragOver}
                    onDragStart={(e) => handleDrag(e, config)}
                    onDrop={handleDrop}
                    className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-white py-2 pl-1 pr-2`}
                    key={config.name + index}
                  >
                    <div className="flex w-full items-center gap-4">
                      <div className="flex shrink-0 grow-0 items-center">
                        <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                        <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="w-full text-sm">Wallets</div>
                      <Toggle checked={config.enabled} />
                    </div>
                    <WalletButton
                      icon={<WalletIcon className="h-4 w-4 text-privurple" strokeWidth={2} />}
                      label="External Wallets"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    draggable
                    id={config.name}
                    onDragOver={handleDragOver}
                    onDragStart={(e) => handleDrag(e, config)}
                    onDrop={handleDrop}
                    className={`flex flex-col gap-y-2 border-y-2 ${defaultConfigStyles} bg-white py-2 pl-1 pr-2`}
                    key={config.name + index}
                  >
                    <div className="flex w-full items-center gap-4">
                      <div className="flex shrink-0 grow-0 items-center">
                        <EllipsisVerticalIcon className="h-4 w-4" strokeWidth={2} />
                        <EllipsisVerticalIcon className="-m-3 h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="w-full text-sm">Email / SMS / Socials</div>
                      <Toggle checked={config.enabled} />
                    </div>
                    <div className="flex gap-x-4">
                      <WalletButton
                        className="w-full"
                        type="radio"
                        icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                        label="Email"
                      />
                      <WalletButton
                        className="w-full"
                        type="radio"
                        icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                        label="SMS"
                      />
                    </div>
                    <div className="my-2 h-[1px] w-full shrink-0 grow-0 bg-gray-300"></div>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-4">
                        <WalletButton
                          className="w-full"
                          type="checkbox"
                          icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                          label="Google"
                        />
                        <WalletButton
                          className="w-full"
                          type="checkbox"
                          icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                          label="Apple"
                        />
                      </div>
                      <div className="flex gap-x-4">
                        <WalletButton
                          className="w-full"
                          type="checkbox"
                          icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                          label="Twitter"
                        />
                        <WalletButton
                          className="w-full"
                          type="checkbox"
                          icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                          label="Discord"
                        />
                      </div>
                      <div className="flex gap-x-4 pr-4">
                        <WalletButton
                          className="w-1/2"
                          type="checkbox"
                          icon={<WalletIcon className="h-4 w-4" strokeWidth={2} />}
                          label="Github"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
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
            <Toggle checked={true} />
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
