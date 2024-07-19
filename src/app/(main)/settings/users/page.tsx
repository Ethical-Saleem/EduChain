"use client";

import React, { useState, useRef, useEffect } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { getCookie } from "@/app/utils/cookies";
import { Demo } from "../../../../../types";
import { AccountService } from "@/app/services/AccountService";
import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { Menu } from "primereact/menu";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import { withAuth } from "@/app/hoc/WithAuth";

const UserSetting = () => {
  const emptyUserData: Demo.NewUser = {
    name: "",
    email: "",
    telephone: "",
    password: "",
    schoolId: 0,
    isNewSuper: false,
  };
  const [users, setUsers] = useState([] as Demo.User[]);
  const [newUserData, setNewUserData] = useState<Demo.NewUser>(emptyUserData);
  const [selectedUser, setSelectedUser] = useState<Demo.User | null>(null);
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);
  const [roles, setRoles] = useState([] as Demo.Role[]);
  const [newRole, setNewRole] = useState({} as Demo.RoleClaim);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dt = useRef<DataTable<any>>(null);
  const menu = useRef<Menu>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        dispatchFetchUsers(parsedUser?.school.id);
      }
    }
    const dispatchFetchRoles = async () => {
      const result = await AccountService.fetchRoles();
      setRoles(result);
    };

    dispatchFetchRoles();
  }, []);

  const openDialog = () => {
    setCreateModal(true);
  };
  const closeDialog = () => {
    setCreateModal(false);
    setNewUserData(emptyUserData);
  };

  const openAssignModal = (data: Demo.User) => {
    setSelectedUser(data);
    setAssignModal(true);
  };
  const closeAssignModal = () => {
    setAssignModal(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (data: Demo.User) => {
    setSelectedUser(data);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedUser(null);
  };

  const dispatchFetchUsers = (id: number | undefined): any => {
    setFetching(true);
    AccountService.fetchUsers(id).then(
      (data) => {
        setUsers(data);
        setFetching(false);
      },
      (error: any) => {
        if (error.response) {
          if (error.response?.status === 403) {
            router.push("/403");
          } else {
            toast.error(`Error: ${error.response.data.message}`)
          }
        } else if (error.message) {
          toast.error(`Error: ${error.message}`)
        } else {
          toast.error(`Error: ${error}`)
        }
        setFetching(false);
        toast.error(error);
        console.log("fetch-error", error);
      }
    );
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    newUserData.schoolId = currentUser?.school.id;
    try {
      const res = await AuthenticationService.registerUser(newUserData);
      console.log(res);
      if (res) {
        toast.success("User created successfully");

        dispatchFetchUsers(currentUser?.school.id);
        setLoading(false);
        closeDialog();
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`)
      } else if (error.message) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.error(`Error: ${error}`)
      }
    }
  };

  const assingUserToRole = async () => {
    setLoading(true);
    try {
      const res = await AccountService.addUserToRole(
        newRole.roleId,
        selectedUser?.userId
      );
      if (res) {
        toast.success(`User, ${selectedUser?.name} assigned to a new role`);
      }
      setLoading(false);
      dispatchFetchUsers(currentUser?.school.id);
      closeAssignModal();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`)
      } else if (error.message) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.error(`Error: ${error}`)
      }
    }
  };

  const dispatchRemoveUser = async () => {
    setLoading(true);
    try {
      const res = await AccountService.deleteUser(selectedUser?.id);
      if (res) {
        toast.success("User record deleted successfully");
        setLoading(false);
        dispatchFetchUsers(currentUser?.school.id);
        closeDeleteModal();
      }
    } catch (error: any) {
      setLoading(false);
      console.log("delete-error", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`)
      } else if (error.message) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.error(`Error: ${error}`)
      }
    }
  };

  const onInputUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...newUserData };
    _data[`${name}`] = val;

    setNewUserData(_data);
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Create new user"
            icon="pi pi-plus"
            severity="success"
            onClick={openDialog}
            className=" mr-2"
          />
        </div>
      </React.Fragment>
    );
  };

  const TableActionsTemplate = (rowData: Demo.User) => {
    return (
      <>
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          rounded
          text
          className="p-button-plain"
          onClick={(event) => menu.current?.toggle(event)}
        />
        <Menu
          ref={menu}
          popup
          model={[
            {
              label: "Assign to new role",
              icon: "pi pi-fw pi-arrow-down-left-and-arrow-up-right-to-center",
              command: () => openAssignModal(rowData),
            },
            {
              label: "Remove",
              icon: "pi pi-fw pi-trash",
              command: () => openDeleteModal(rowData),
            },
          ]}
        />
      </>
    );
  };

  const EmailverifiedTemplate = (rowData: Demo.User) => {
    return (
      <>
        {rowData.hasVerifiedEmail ? (
          <span className="text-green-400">TRUE</span>
        ) : (
          <span className="text-red-400">FALSE</span>
        )}
      </>
    );
  };

  const RoleClaimTemplate = (rowData: Demo.User) => {
    return (
      <>
        <span>{rowData.roleClaim.role.name}</span>
      </>
    );
  };

  const AssignModalFooter = () => {
    return (
      <>
        <Button
          label="Submit"
          icon="pi pi-check"
          loading={loading}
          onClick={assingUserToRole}
        />
        <Button label="Cancel" icon="pi pi-times" onClick={closeAssignModal} />
      </>
    );
  };

  const DeleteModalFooter = () => {
    return (
      <>
        <Button
          label="Close"
          icon="pi pi-times"
          text
          onClick={closeDeleteModal}
        />
        <Button
          label="Delete"
          outlined
          icon="pi pi-trash"
          loading={loading}
          onClick={dispatchRemoveUser}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>

      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <>
      {fetching && <Loading />}
      {!fetching && (<div className="grid">
        <div className="col-12">
          <div className="card">
            <ToastContainer />
            <Toolbar className="mb-4" end={rightToolbarTemplate} />
            <DataTable
              ref={dt}
              value={users}
              selection={selectedUsers}
              onSelectionChange={(e) => setSelectedUsers(e.value as any)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              className="datatable-responsive"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
              globalFilter={globalFilter}
              emptyMessage="No records found."
              header={header}
              loading={fetching}
              responsiveLayout="scroll"
            >
              <Column
                field="name"
                header="USERNAME"
                sortable
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="email"
                header="EMAIL"
                sortable
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="telephone"
                header="TELEPHONE"
                sortable
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="hasVerifiedEmail"
                header="EMAIL VERIFIED"
                sortable
                body={EmailverifiedTemplate}
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="roleClaim"
                header="ROLE"
                sortable
                body={RoleClaimTemplate}
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                headerStyle={{ minWidth: "15rem" }}
                body={TableActionsTemplate}
              ></Column>
            </DataTable>

            <Dialog
              visible={createModal}
              style={{ width: "450px" }}
              modal
              header="New User Creation"
              onHide={closeDialog}
            >
              <form onSubmit={createUser} className="">
                <div className="formgrid grid mb-2">
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-base font-medium mb-2"
                    >
                      UserName
                    </label>
                    <InputText
                      id="name"
                      placeholder="School Name"
                      className="w-full mb-2 p-2 bg-gray-200"
                      onChange={(e) => onInputUserChange(e, "name")}
                      value={newUserData.name}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="email1"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Email
                    </label>
                    <InputText
                      id="email1"
                      type="text"
                      placeholder="Email address"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputUserChange(e, "email")}
                      value={newUserData.email}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Telephone
                    </label>
                    <InputText
                      id="telephone"
                      placeholder="Telephone"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputUserChange(e, "telephone")}
                      value={newUserData.telephone}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="password1"
                      className="block text-900 font-medium text-basebase mb-2"
                    >
                      Default Password
                    </label>
                    <Password
                      inputId="password1"
                      value={newUserData.password}
                      onChange={(e) => onInputUserChange(e, "password")}
                      placeholder="Password"
                      toggleMask
                      className="w-full mb-2"
                      inputClassName="w-full p-2 bg-gray-200"
                    ></Password>
                  </div>
                </div>
                <div className="md:mt-3 text-center">
                  <Button
                    label="Continue"
                    className="w-full bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
                    loading={loading}
                    type="submit"
                  ></Button>
                </div>
              </form>
            </Dialog>

            <Dialog
              visible={assignModal}
              style={{ width: "450px" }}
              modal
              header="Assign User To New Role"
              onHide={closeAssignModal}
              footer={AssignModalFooter}
            >
              <div>
                <div className="field mb-2">
                  <label htmlFor="currentRole" className="block">
                    Current Role
                  </label>
                  <InputText
                    id="currentRole"
                    value={selectedUser?.roleClaim.role.name}
                    disabled
                    className="w-full"
                  />
                </div>
                <div className="field mb-2">
                  <label htmlFor="newRole" className="block">
                    New Role
                  </label>
                  <Dropdown
                    value={newRole}
                    onChange={(e) => setNewRole(e.value)}
                    options={roles}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="-- Select --"
                    className="w-full"
                  ></Dropdown>
                </div>
              </div>
            </Dialog>

            <Dialog
              visible={deleteModal}
              style={{ width: "450px" }}
              modal
              header="Delete?"
              onHide={closeDeleteModal}
              footer={DeleteModalFooter}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {selectedUser && (
                  <span>
                    Are you sure you want to remove User:{" "}
                    <b>{selectedUser.name}</b>&apos;s record?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default withAuth(UserSetting);
