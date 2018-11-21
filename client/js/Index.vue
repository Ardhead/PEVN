<template>
  <div>
    <div class="container">
      <form class="container-element" enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Please Upload CSV config file</h1>
        <div class="dropbox">
        <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="text/csv" class="input-file">
          <p v-if="isInitial">
            Drag your file here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading file...
          </p>
        </div>
      </form>
      <button class="container-element clean-button" v-if="isSuccess" @click="cleanDb();">Clean Database</button>
      <svg class="container-element " width="900" height="900" v-show="isSuccess" @load="renderD3(isSuccess);"></svg>
      <div class="container-element" v-if="isFailed">
        <h2>Request failed.</h2>
        <pre>{{ requestError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { upload, clean } from './services/shipments.service';
import { runRenderD3 } from './services/runRenderD3.service';

// set statuses constants
const statusInitial = 0;
const statusSaving = 1;
const statusSuccess = 2;
const statusFailed = 3;
export default {
    data() {
        return {
            shipments: null,
            requestError: null,
            currentStatus: null,
            uploadFieldName: 'csv'
        }
    },
    computed: {
      // check current status
      isInitial() {
        return this.currentStatus === statusInitial;
      },
      isSaving() {
        return this.currentStatus === statusSaving;
      },
      isSuccess() {
        return this.currentStatus === statusSuccess;
      },
      isFailed() {
        return this.currentStatus === statusFailed;
      }
    },
    methods: {
      // clean database & set initial status
      cleanDb() {
        clean(this.apiUrl)
          .then(x => {
            this.shipments = null;
            this.currentStatus = statusInitial;
          })
          .catch(err => {
            this.requestError = err.response;
            this.currentStatus = statusFailed;
          });
      },
      // upload csv to the server & render json result
      save(formData) {
        this.currentStatus = statusSaving;

        upload(formData, this.apiUrl)
          .then(shipments => {
            this.shipments = shipments;
            this.currentStatus = statusSuccess;
            this.runRenderD3(this.shipments)
          })
          .catch(err => {
            this.requestError = err.response;
            this.currentStatus = statusFailed;
          });
      },
      // render json result if it come from index file on load
      renderD3(isSuccess) {
        if (isSuccess) {
          this.runRenderD3(this.shipments)
        }
      },
      // handle file upload
      filesChange(fieldName, fileList) {
        const formData = new FormData();

        if (!fileList.length) return;
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      }
    },
    // starter function
    created() {
      this.runRenderD3 = runRenderD3;
      this.shipments = this.$parent.shipments;
      this.apiUrl = this.$parent.apiUrl;
      this.currentStatus = (this.shipments && Object.keys(this.shipments).length) ? statusSuccess : statusInitial;
    }
}
</script>