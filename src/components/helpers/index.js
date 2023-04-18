export const formatearFecha = fecha => //se necesita darle formato a la fecha ya que es un objeto desde el prop original
{
  const nuevaFecha = new Date(fecha);
  const opciones = {
      weekday: 'long',
      year:'numeric',
      month:'long',
      day:'numeric'
  }

  return nuevaFecha.toLocaleString('es-Es', opciones)
}