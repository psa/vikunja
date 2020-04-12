import TaskCollectionService from '../../../services/taskCollection'

/**
 * This mixin provides a base set of methods and properties to get tasks on a list.
 */
export default {
	data() {
		return {
			taskCollectionService: TaskCollectionService,
			tasks: [],

			pages: [],
			currentPage: 0,

			showTaskSearch: false,
			searchTerm: '',
		}
	},
	watch: {
		'$route.query': 'loadTasksForPage', // Only listen for query path changes
	},
	created() {
		this.taskCollectionService = new TaskCollectionService()
	},
	methods: {
		loadTasks(page, search = '', params = {sort_by: ['done', 'id'], order_by: ['asc', 'desc']}) {
			if (search !== '') {
				params.s = search
			}
			this.taskCollectionService.getAll({listId: this.$route.params.id}, params, page)
				.then(r => {
					this.$set(this, 'tasks', r)
					this.$set(this, 'pages', [])
					this.currentPage = page

					for (let i = 0; i < this.taskCollectionService.totalPages; i++)  {

						// Show ellipsis instead of all pages
						if(
							i > 0 && // Always at least the first page
							(i + 1) < this.taskCollectionService.totalPages && // And the last page
							(
								// And the current with current + 1 and current - 1
								(i + 1) > this.currentPage + 1 ||
								(i + 1) < this.currentPage - 1
							)
						) {
							// Only add an ellipsis if the last page isn't already one
							if(this.pages[i - 1] && !this.pages[i - 1].isEllipsis) {
								this.pages.push({
									number: 0,
									isEllipsis: true,
								})
							}
							continue
						}

						this.pages.push({
							number: i + 1,
							isEllipsis: false,
						})
					}
				})
				.catch(e => {
					this.error(e, this)
				})
		},
		loadTasksForPage(e) {
			// The page parameter can be undefined, in the case where the user loads a new list from the side bar menu
			let page = e.page
			if (typeof e.page === 'undefined') {
				page = 1
			}
			let search = e.search
			if (typeof e.search === 'undefined') {
				search = ''
			}
			this.initTasks(page, search)
		},
		sortTasks() {
			if (this.tasks === null || this.tasks === []) {
				return
			}
			return this.tasks.sort(function(a,b) {
				if (a.done < b.done)
					return -1
				if (a.done > b.done)
					return 1

				if (a.id > b.id)
					return -1
				if (a.id < b.id)
					return 1
				return 0
			})
		},
		searchTasks() {
			if (this.searchTerm === '') {
				return
			}
			this.$router.push({
				name: 'showList',
				query: {search: this.searchTerm}
			})
		},
		hideSearchBar() {
			// This is a workaround.
			// When clicking on the search button, @blur from the input is fired. If we
			// would then directly hide the whole search bar directly, no click event
			// from the button gets fired. To prevent this, we wait 200ms until we hide
			// everything so the button has a chance of firering the search event.
			setTimeout(() => {
				this.showTaskSearch = false
			}, 200)
		},
		getRouteForPagination(page = 1, type = 'list') {
			return {
				name: 'showListWithType',
				params: {
					type: type
				},
				query: {
					page: page,
				},
			}
		}
	}
}