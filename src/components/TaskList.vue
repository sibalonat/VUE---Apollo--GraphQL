<template>
  <div>
    <div v-show="open_edit_form">
      <input type="text" v-model="name_edit">
      <button @click="save_edit_data">Save</button>
    </div>
    <!-- <ul> -->
      <ul class="list-group">
        <li class="list-group-item active" v-for="task in tasks" :key="task.id">
          {{task.name}}
          <button @click="edit_data(task.id, task.name)">Edit Task</button>
          <button @click="delete_data(task.id)">Delete Task</button>
        </li>
      </ul>
      <div v-if="paginator">
        <div>Page: {{paginator.currentPage}}/{{paginator.lastPage}}</div>
        <div>
          Displaying: {{paginator.count}} entries out of {{paginator.total}}
        </div>
        <div>
          <button @click="page--">Prev</button>
          <button @click="page++">Next</button>
        </div>
      </div>
      <button @click="open_form = true">Add a new Task</button>

    <!-- </ul> -->
    <div v-show="open_form">
      <input type="text" v-model="name">
      <button @click="save_data">Save</button>
    </div>
  </div>
</template>

<script>
import TASK_QUERY from "@/graphql/Tasks.gql";
import CREATE_TASK_MUTATION from "@/graphql/CreateTask.gql";
import DELETE_TASK_MUTATION from "@/graphql/DeleteTask.gql";
import UPDATE_TASK_MUTATION from "@/graphql/UpdateTask.gql";
export default {
  data() {
    return {
      tasks: null,
      name: '',
      open_form: false,
      open_edit_form: false,
      name_edit: '',
      page: 1,
      perPage: 10,
      paginator: null
    };
  },
  methods: {
    save_data() {
      this.$apollo.mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          name: this.name
        }
      }).then(() => {
        this.name = '',
        this.open_form = false,
        this.$apollo.queries.tasks.refetch()
      })
    },
    edit_data(id, name) {
      this.open_edit_form = true;
      this.id_edit = id;
      this.name_edit = name;
    },
    save_edit_data() {
      this.$apollo.mutate({
        mutation: UPDATE_TASK_MUTATION,
        variables: {
          id: this.id_edit,
          name: this.name_edit
        }
      }).then(() => {
        this.id_edit = null,
        this.name_edit = '',
        this.open_edit_form = false,
        this.$apollo.queries.tasks.refetch()
      })
    },
    delete_data(id) {
      this.$apollo.mutate({
        mutation: DELETE_TASK_MUTATION,
        variables: {
          id: id
        }
      }).then(() => {
        this.$apollo.queries.tasks.refetch()
      })
    }
  },
  apollo: {
    tasks: {
      query: TASK_QUERY,
      variables() {
        return {
          perPage: this.perPage,
          page: this.page
        }
      },
      update: function(data) {
        this.paginator = data.tasks.paginatorInfo;
        
        return data.tasks.data;
      }    
    }
  }
}
</script>


