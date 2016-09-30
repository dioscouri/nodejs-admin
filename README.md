## nodejs-admin application

[![Build Status](https://travis-ci.org/dioscouri/nodejs-admin.svg?branch=master)](https://travis-ci.org/dioscouri/nodejs-admin)

#### ACL Setup

1. Describe your application resources and actions using `acl_resources` model inside main application. See [example](https://bitbucket.org/cohengroup/gvs-provider-management/src/cdf277e16f3683ac4c54636ba9735f4441f0a014/app/models/common/acl_resources.js?at=master&fileviewer=file-view-default)

2. Register `acl_resources` model in Registry. See [example](https://bitbucket.org/cohengroup/gvs-provider-management/src/cdf277e16f3683ac4c54636ba9735f4441f0a014/app/bootstrap.js?at=master&fileviewer=file-view-default#bootstrap.js-58)

3. Create 2 extra fields in controller:

    - `_aclResourceName` - A String, describes current resource name. See [example](https://bitbucket.org/cohengroup/gvs-provider-management/src/cdf277e16f3683ac4c54636ba9735f4441f0a014/app/controllers/admin/doctors.js?at=master&fileviewer=file-view-default#doctors.js-75)
    - `_protected` - An Array of Strings, describes protected routes. See [example](https://bitbucket.org/cohengroup/gvs-provider-management/src/cdf277e16f3683ac4c54636ba9735f4441f0a014/app/controllers/admin/doctors.js?at=master&fileviewer=file-view-default#doctors.js-83)

4. Login into Admin UI, create and configure your roles (`/admin/acl_roles`) and permissions (`/admin/acl_permissions`)

5. Assign created roles to users using a `Permissions` tab in a user edit UI

#### List Export Setup

1. Configure Export fields and aliases (future column names) in your CRUD Controller:

    ```
    this._xlsExportFields = [{field: '_id', column: 'ID'}, {field: 'name', column: 'Doctor Name'}];
    ```

2. Use `exportActionUrl` in views to export

#### Audit logging

How to upgrade to new logging:

1. Update base model in your project, add `resourceModel` to `traceModelChange` calls, see [example](https://bitbucket.org/cohengroup/gvs-app/commits/e27cd11f5f39ec73877c87dfa8ece490214e731d#Lapp/models/common/basemodel.jsT87).
2. Optionally. Add array of fields to audit ignore to your models, it should be called as `auditIgnoredFields`, see [example](https://bitbucket.org/cohengroup/gvs-app/commits/e27cd11f5f39ec73877c87dfa8ece490214e731d#Lapp/models/common/doctor.jsT162).