exports.install = function (Vue) {
    Vue.mixin({
        methods: {
            logOutApp: function () {
            localStorage.removeItem('spx_tok_p')
            localStorage.removeItem('spx_nam_p')
            this.$router.push('/login') 
            },
            headRequest: function () {
                var response = {
                    headers : {
                        'Authorization': localStorage.getItem('spx_tok_p'),
                        'firm' : 'de73cceb749cd2321ac5c2f57a9433fe58d3ab25',
                        'applicant' : localStorage.getItem('spx_nam_p')
                    }
                }
                return response
            },
			tablaDinamica : function (p_searching,p_paginate,p_ordering) {
				var response =	{
					searching: p_searching,
					paginate: p_paginate,
					ordering: p_ordering,
					lengthMenu: [[5,10, 25, 50, -1],[5,10, 25, 50,"Todo"],],
					pageLength: 5,
					buttons: [
						'copyHtml5',
						'excelHtml5',
						'csvHtml5',
						'pdfHtml5'
					],
					oLanguage: {
					sLengthMenu: 'Mostrar _MENU_ registros por pagina',
					sInfo:       'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
					sInfoEmpty:      'Mostrando registros del 0 al 0 de un total de 0 registros',
					sInfoFiltered:   '  -  filtrado de un total de _MAX_ registros  - ',
					sSearch:     'Buscar:',
					oPaginate: {
					sFirst:    'Primero',
					sLast:     'Ãšltimo',
					sNext:     'Siguiente',
					sPrevious: 'Anterior' },
					}
				}
				return response
			}
        },
    })
}