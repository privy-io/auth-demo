// Modified from https://tailwindui.com/components/application-ui/forms/select-menus

import {Listbox, Transition} from '@headlessui/react';
import {WalletIcon, ChevronDownIcon, CheckIcon} from '@heroicons/react/20/solid';
import {classNames} from '../lib/classNames';

export default function ActiveWalletDropdown(props: {
  disabled?: boolean;
  options?: {title: string; description: string; selected: boolean; onClick: () => void}[];
}) {
  const selected = props.options?.find((o) => o.selected);

  return (
    <Listbox
      value={selected}
      disabled={props.disabled}
      as="div"
      // Divs can't be "disabled", so we do this to use `group-[.disabled]`
      className={classNames('group m-auto', props.disabled ? 'disabled' : '')}
    >
      {({open}) => (
        <>
          <div className="relative min-w-[300px] max-w-[300px]">
            <div className="inline-flex w-full divide-x divide-slate-200 rounded-md shadow-sm">
              <div className="inline-flex w-full items-center rounded-l-md border border-transparent bg-white py-2 pl-3 pr-4 text-privurple group-[.disabled]:text-slate-400">
                <WalletIcon className="h-5 w-5" aria-hidden="true" />
                <p className="ml-2.5 text-sm font-medium">Active Wallet: {selected?.title}</p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-white p-2 text-sm font-medium text-privurple hover:bg-privurpleaccent hover:text-white focus:outline-none focus:ring-2 focus:ring-privurple focus:ring-offset-2 focus:ring-offset-gray-50 group-[.disabled]:text-slate-400 group-[.disabled]:hover:bg-white">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="relative z-10 mt-2 w-full origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {props.options?.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({active}) =>
                      classNames(
                        active ? 'bg-privurple text-white' : 'text-privy-navy',
                        'cursor-pointer select-none p-3 text-sm',
                      )
                    }
                    value={option}
                    onClick={option.onClick}
                  >
                    {({selected, active}) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold' : 'font-normal'}>
                            {option.title}
                          </p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-privurple'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-indigo-200' : 'text-gray-500',
                            'mt-1',
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
