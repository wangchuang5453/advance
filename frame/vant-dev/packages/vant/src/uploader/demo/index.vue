<script setup lang="ts">
import VanUploader from '..';
import VanButton from '../../button';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';
import { UploaderFileListItem } from '../types';
import { Toast } from '../../toast';

const t = useTranslate({
  'zh-CN': {
    status: '上传状态',
    failed: '上传失败',
    upload: '上传文件',
    preview: '文件预览',
    maxSize: '限制上传大小',
    disabled: '禁用文件上传',
    maxCount: '限制上传数量',
    uploading: '上传中...',
    imageName: '图片名称',
    beforeRead: '上传前置处理',
    overSizeTip: '文件大小不能超过 500kb',
    invalidType: '请上传 jpg 格式图片',
    customUpload: '自定义上传样式',
    previewSize: '自定义预览大小',
    previewCover: '自定义预览样式',
    deleteMessage: '删除前置处理',
    customPreviewImage: '自定义单个图片预览',
  },
  'en-US': {
    status: 'Upload Status',
    failed: 'Failed',
    upload: 'Upload File',
    preview: 'Preview File',
    maxSize: 'Max Size',
    disabled: 'Disable Uploader',
    maxCount: 'Max Count',
    uploading: 'Uploading...',
    imageName: 'Image Name',
    beforeRead: 'Before Read',
    overSizeTip: 'File size cannot exceed 500kb',
    invalidType: 'Please upload an image in jpg format',
    customUpload: 'Custom Upload Area',
    previewSize: 'Preview Size',
    previewCover: 'Preview Cover',
    deleteMessage: 'Before Delete',
    customPreviewImage: 'Custom single preview image',
  },
});

const fileList = ref([
  { url: cdnURL('leaf.jpeg') },
  { url: cdnURL('tree.jpeg') },
]);

const fileList2 = ref([{ url: cdnURL('sand.jpeg') }]);

const fileList3 = ref([]);

const fileList4 = ref([{ url: cdnURL('sand.jpeg') }]);

const fileList5 = ref<UploaderFileListItem[]>([
  {
    url: cdnURL('sand.jpeg'),
    deletable: true,
    beforeDelete: () => {
      Toast(t('deleteMessage'));
    },
  },
  {
    url: cdnURL('tree.jpeg'),
    imageFit: 'contain',
  },
]);

const statusFileList = ref<UploaderFileListItem[]>([
  {
    url: cdnURL('leaf.jpeg'),
    status: 'uploading',
    message: t('uploading'),
  },
  {
    url: cdnURL('tree.jpeg'),
    status: 'failed',
    message: t('failed'),
  },
]);

const previewCoverFiles = ref<UploaderFileListItem[]>([
  {
    url: cdnURL('leaf.jpeg'),
    file: {
      name: t('imageName'),
    } as File,
  },
]);

const previewSizeFiles = ref<UploaderFileListItem[]>([
  {
    url: cdnURL('leaf.jpeg'),
  },
]);

const beforeRead = (file: File | File[]) => {
  if (Array.isArray(file)) {
    return true;
  }
  if (file.type !== 'image/jpeg') {
    Toast(t('invalidType'));
    return false;
  }
  return true;
};

const afterRead = (
  file: UploaderFileListItem | UploaderFileListItem[],
  detail: unknown
) => {
  console.log(file, detail);
};

const setItemLoading = (item: UploaderFileListItem) => {
  item.status = 'uploading';
  item.message = t('uploading');

  setTimeout(() => {
    item.status = 'failed';
    item.message = t('failed');
  }, 1000);
};

const afterReadFailed = (
  item: UploaderFileListItem | UploaderFileListItem[]
) => {
  if (Array.isArray(item)) {
    item.forEach(setItemLoading);
  } else {
    setItemLoading(item);
  }
};

const onOversize = (file: UploaderFileListItem, detail: unknown) => {
  console.log(file, detail);
  Toast(t('overSizeTip'));
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <van-uploader :after-read="afterRead" />
  </demo-block>

  <demo-block :title="t('preview')">
    <van-uploader v-model="fileList" multiple accept="*" />
  </demo-block>

  <demo-block :title="t('status')">
    <van-uploader v-model="statusFileList" :after-read="afterReadFailed" />
  </demo-block>

  <demo-block :title="t('maxCount')">
    <van-uploader v-model="fileList2" multiple :max-count="2" />
  </demo-block>

  <demo-block :title="t('maxSize')">
    <van-uploader
      v-model="fileList4"
      multiple
      :max-size="500 * 1024"
      @oversize="onOversize"
    />
  </demo-block>

  <demo-block :title="t('customUpload')">
    <van-uploader>
      <van-button type="primary" icon="plus">
        {{ t('upload') }}
      </van-button>
    </van-uploader>
  </demo-block>

  <demo-block :title="t('previewCover')">
    <van-uploader v-model="previewCoverFiles">
      <template #preview-cover="{ file }">
        <div class="preview-cover van-ellipsis">{{ file.name }}</div>
      </template>
    </van-uploader>
  </demo-block>

  <demo-block :title="t('previewSize')">
    <van-uploader v-model="previewSizeFiles" preview-size="60" />
  </demo-block>

  <demo-block :title="t('beforeRead')">
    <van-uploader v-model="fileList3" :before-read="beforeRead" />
  </demo-block>

  <demo-block :title="t('disabled')">
    <van-uploader :after-read="afterRead" disabled />
  </demo-block>

  <demo-block :title="t('customPreviewImage')">
    <van-uploader v-model="fileList5" multiple accept="*" :deletable="false" />
  </demo-block>
</template>

<style lang="less">
.demo-uploader {
  background-color: var(--van-background-color-light);

  .van-uploader {
    margin-left: var(--van-padding-md);
  }

  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
