import Image from 'next/image';
import type { NextRouter } from 'next/router';
import formatNumber from '@/utils/formatNumber';
import type { Provider } from '@/utils/providerHelper';
import providers from '@/utils/providerHelper';
import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import Sidepanel from '@/components/sidepanel/Sidepanel';
import SidepanelHeader from '@/components/sidepanel/SidepanelHeader';
import SidepanelPage from '@/components/sidepanel/SidepanelPage';
import SidepanelTabs from '@/components/sidepanel/SidepanelTabs';
import type { ToastProps } from '@/components/toast/hooks/useToast';
import type {
  HiddenResource,
  InventoryFilterData,
  InventoryStats,
  View
} from '../../hooks/useInventory/types/useInventoryTypes';
import InventoryFilterSummary from '../filter/InventoryFilterSummary';
import InventoryViewsHeader from '../InventoryViewsHeader';
import InventoryViewAlerts from './alerts/InventoryViewAlerts';
import useViews from './hooks/useViews';

type InventoryViewProps = {
  filters: InventoryFilterData[] | undefined;
  displayedFilters: InventoryFilterData[] | undefined;
  setToast: (toast: ToastProps | undefined) => void;
  inventoryStats: InventoryStats | undefined;
  router: NextRouter;
  views: View[] | undefined;
  getViews: (edit?: boolean | undefined, viewName?: string | undefined) => void;
  hiddenResources: HiddenResource[] | undefined;
  setHideOrUnhideHasUpdate: (hideOrUnhideHasUpdate: boolean) => void;
};
function InventoryView({
  filters,
  displayedFilters,
  setToast,
  inventoryStats,
  router,
  views,
  getViews,
  hiddenResources,
  setHideOrUnhideHasUpdate
}: InventoryViewProps) {
  const {
    isOpen,
    openModal,
    closeModal,
    view,
    handleChange,
    saveView,
    loading,
    page,
    goTo,
    deleteView,
    bulkItems,
    bulkSelectCheckbox,
    onCheckboxChange,
    handleBulkSelection,
    unhideLoading,
    unhideResources,
    deleteLoading
  } = useViews({
    setToast,
    views,
    router,
    getViews,
    hiddenResources,
    setHideOrUnhideHasUpdate
  });

  return (
    <>
      <InventoryViewsHeader
        openModal={openModal}
        views={views}
        router={router}
        saveView={saveView}
        setToast={setToast}
        loading={loading}
        deleteView={deleteView}
        deleteLoading={deleteLoading}
      />

      {/* Alerts button */}
      {router.query.view && (
        <div className="absolute right-0">
          <Button
            style="outline"
            size="sm"
            align="left"
            transition={false}
            onClick={() => {
              openModal(undefined, 'alerts');
            }}
            loading={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M12.02 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.77c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M13.87 3.2a6.754 6.754 0 00-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26z"
              ></path>
              <path
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M15.02 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 01-.88-2.12"
              ></path>
            </svg>
            Alerts
          </Button>
        </div>
      )}

      {/* Save as a view button */}
      {!router.query.view && (
        <Button size="sm" onClick={() => openModal(filters)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 8.99v11.36c0 1.45-1.04 2.06-2.31 1.36l-3.93-2.19c-.42-.23-1.1-.23-1.52 0l-3.93 2.19c-1.27.7-2.31.09-2.31-1.36V8.99c0-1.71 1.4-3.11 3.11-3.11h7.78c1.71 0 3.11 1.4 3.11 3.11z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M22 5.11v11.36c0 1.45-1.04 2.06-2.31 1.36L16 15.77V8.99c0-1.71-1.4-3.11-3.11-3.11H8v-.77C8 3.4 9.4 2 11.11 2h7.78C20.6 2 22 3.4 22 5.11zM7 12h4M9 14v-4"
            ></path>
          </svg>
          Save as a view
        </Button>
      )}

      {/* Sidepanel */}
      <Sidepanel isOpen={isOpen} closeModal={closeModal} noScroll={true}>
        <SidepanelHeader
          title={router.query.view ? view.name : 'Save as a view'}
          subtitle={`${inventoryStats?.resources} ${
            inventoryStats?.resources === 1 ? 'resource' : 'resources'
          } ${
            router.query.view
              ? 'are part of this view'
              : 'will be added to this view'
          }`}
          deleteAction={router.query.view ? deleteView : undefined}
          deleteLabel="Delete view"
          closeModal={closeModal}
        />
        <SidepanelTabs
          goTo={goTo}
          page={page}
          tabs={
            router.query.view
              ? ['View', 'Alerts', 'Hidden Resources']
              : ['View']
          }
        />
        <SidepanelPage page={page} param="view">
          <form onSubmit={e => saveView(e)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {displayedFilters &&
                displayedFilters.length > 0 &&
                displayedFilters.map((data, idx) => (
                  <InventoryFilterSummary key={idx} data={data} />
                ))}
            </div>
            <Input
              name="name"
              label={router.query.view ? 'View name' : 'Choose a view name'}
              type="text"
              error="Please provide a name"
              value={view.name}
              action={handleChange}
              autofocus={true}
            />

            <div className="ml-auto">
              <Button
                size="lg"
                type="submit"
                loading={loading}
                disabled={!view.name}
              >
                {router.query.view ? 'Update view' : 'Save as a view'}{' '}
                <span className="flex items-center justify-center rounded-lg bg-black-900/20 py-1 px-2 text-xs">
                  {inventoryStats?.resources}
                </span>
              </Button>
            </div>
          </form>
        </SidepanelPage>

        <SidepanelPage page={page} param="alerts">
          <InventoryViewAlerts viewId={view.id} setToast={setToast} />
        </SidepanelPage>

        <SidepanelPage page={page} param="hidden resources">
          {hiddenResources && hiddenResources.length > 0 && (
            <>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden">
                <table className="w-full table-auto bg-white text-left text-xs text-gray-900">
                  <thead className="bg-white">
                    <tr className="shadow-[inset_0_-1px_0_0_#cfd7d74d]">
                      <th className="py-4 px-2">
                        <div className="flex items-center">
                          <Checkbox
                            checked={bulkSelectCheckbox}
                            onChange={handleBulkSelection}
                          />
                        </div>
                      </th>
                      <th className="py-4 px-2">Cloud</th>
                      <th className="py-4 px-2">Service</th>
                      <th className="py-4 px-2">Name</th>
                      <th className="py-4 px-2">Region</th>
                      <th className="py-4 px-2">Account</th>
                      <th className="py-4 px-2 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hiddenResources.map(item => (
                      <tr
                        key={item.id}
                        className={`border-b border-black-200/30 last:border-none ${
                          bulkItems &&
                          bulkItems.find(currentId => currentId === item.id)
                            ? 'border-black-200/70 bg-komiser-120'
                            : 'border-black-200/30 bg-white hover:bg-black-100/50'
                        } border-b last:border-none`}
                      >
                        <td className="py-4 px-2">
                          <Checkbox
                            checked={
                              bulkItems &&
                              !!bulkItems.find(
                                currentId => currentId === item.id
                              )
                            }
                            onChange={e => onCheckboxChange(e, item.id)}
                          />
                        </td>
                        <td className="py-4 pl-2 pr-6">
                          <div className="flex items-center gap-2">
                            <picture className="flex-shrink-0">
                              <img
                                src={providers.providerImg(
                                  item.provider as Provider
                                )}
                                className="h-6 w-6 rounded-full"
                                alt={item.provider}
                              />
                            </picture>
                            <span>{item.provider}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">{item.service}</td>
                        <td className="py-4 px-2">
                          <p className="... w-24 truncate">{item.name}</p>
                        </td>
                        <td className="py-4 px-2">
                          <p className="... w-24 truncate">{item.region}</p>
                        </td>
                        <td className="py-4 px-2">
                          <p className="... w-24 truncate">{item.account}</p>
                        </td>
                        <td className="py-4 px-2 text-right">
                          ${formatNumber(item.cost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  disabled={bulkItems && bulkItems.length === 0}
                  loading={unhideLoading}
                  onClick={unhideResources}
                >
                  Unhide resources{' '}
                  <span className="flex items-center justify-center rounded-lg bg-white/10 py-1 px-2 text-xs">
                    {formatNumber(bulkItems.length)}
                  </span>
                </Button>
              </div>
            </>
          )}

          {hiddenResources && hiddenResources.length === 0 && (
            <div className="rounded-lg bg-black-100 p-6">
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="/assets/img/purplin/dashboard.svg"
                  alt="Purplin"
                  width={150}
                  height={100}
                />
                <div className="flex flex-col items-center justify-center gap-2 px-24 text-center">
                  <p className="font-semibold text-black-900">
                    No hidden resources in this view
                  </p>
                  <p className="text-sm text-black-400">
                    To hide a resource from this view, select and hide them on
                    the inventory table.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SidepanelPage>
      </Sidepanel>
    </>
  );
}

export default InventoryView;
