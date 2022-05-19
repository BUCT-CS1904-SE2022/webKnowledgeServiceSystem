<template>
  <a-table stripe :columns="columns" :data-source="$store.state.RelicsList.records" :pagination="false" >
    <template #headerCell="{ column }"  >
      <template v-if="column.key === 'name'">
        <div>
          <smile-outlined />
          名称
        </div>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'img'">
        <img :src="record.imageUrl" alt="" style="width:4vw">
       
      </template>

      <template v-else-if="column.key === 'name'" >
          <div>{{record.name}}</div>
      </template>


      

    </template>
  </a-table>
</template>
<script >
import { SmileOutlined, DownOutlined ,StarOutlined,LikeOutlined} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
const columns = [
  {
    title: '图片',
    dataIndex: 'imgUrl',
    key:'img'
  },
  {
    title: '文物名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '作者',
    dataIndex: 'artist',
    key: 'artist',
  },
  {
    title: '获取方式',
    dataIndex: 'detail',
    key: 'detail',
  },
  {
    title: '发现时间',
    dataIndex: 'discoverTime',
    key: 'age',
  },
  {
    title: '材质',
    dataIndex: 'medium',
    key: 'address',
  },
  {
    title: '类别',
    key: 'class',
    dataIndex: 'customClass',
  },
  {
    title: '所处位置',
    key: 'location',
    dataIndex: 'location',
  },

  {
    title: '博物馆',
    key: 'museum',
    dataIndex: 'museum',
  },
  
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York ',
    tags: ['nice', 'developer'],
    ad:'dad'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London',
    tags: ['loser'],
    ad:'dad'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney',
    tags: ['cool', 'teacher'],
    ad:'dad'
  },
];

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    StarOutlined,
    LikeOutlined
  },
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>

